/**
 * Rule-Based Matching Utility for ImpactBridge
 * 
 * Demonstrates:
 * - Module 1: Functions, ES Modules (export), Array filtering (.filter), Destructuring, Boolean logic
 * 
 * Matching Logic:
 * Evaluates compatibility between Donor Resources and NGO Requirements:
 * 1. Category compatibility (Primary factor)
 * 2. Location compatibility (Same city/ward/cluster gets higher score)
 * 3. Quantity analysis (Full fulfillment vs Partial stock booking)
 * 4. Open status check
 * 
 * @param {Object} resource - The donor resource selected for matching
 * @param {Array} needsList - List of current community requirements
 * @returns {Array} List of matching needs with match score and metadata
 */
export function findSuitableMatches(resource, needsList) {
  if (!resource || !Array.isArray(needsList)) {
    return [];
  }

  const availableQty = Number(resource.availableQuantity ?? resource.quantity ?? 0);
  if (availableQty <= 0) {
    return [];
  }

  const matches = [];

  needsList.forEach((need) => {
    // Only evaluate open or partially fulfilled needs
    if (need.status === 'Fulfilled') return;

    // Rule 1: Category Match (Normalized)
    const catA = (need.category || '').trim().toLowerCase();
    const catB = (resource.category || '').trim().toLowerCase();
    const isCategoryMatch = catA === catB;

    if (!isCategoryMatch) return; // Category is mandatory

    // Rule 2: Location Match
    const locA = (need.location || '').trim().toLowerCase();
    const locB = (resource.location || '').trim().toLowerCase();
    const isLocationMatch = locA === locB || locA.includes(locB) || locB.includes(locA);

    // Rule 3: Quantity Evaluation
    const remainingNeeded = Math.max(0, Number(need.quantityRequired || 0) - Number(need.quantityFulfilled || 0));
    const isQuantitySufficient = availableQty >= remainingNeeded;
    const canPartiallyFulfill = availableQty > 0 && remainingNeeded > 0;

    // Calculate Match Score Percentage (100% = Exact location & full quantity)
    let score = 50; // Category match baseline
    if (isLocationMatch) score += 30;
    if (isQuantitySufficient) {
      score += 20;
    } else if (canPartiallyFulfill) {
      score += Math.round((availableQty / remainingNeeded) * 20);
    }

    matches.push({
      ...need,
      matchScore: Math.min(100, score),
      isLocationMatch,
      isQuantitySufficient,
      remainingNeeded,
      maxAllocatable: Math.min(availableQty, remainingNeeded)
    });
  });

  // Sort by highest match score first
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Evaluates matching resources for a given NGO need
 * @param {Object} need - The NGO community need
 * @param {Array} resourcesList - List of available donor resources
 * @returns {Array} List of candidate donor resources that can fulfill this need
 */
export function findMatchingResourcesForNeed(need, resourcesList) {
  if (!need || !Array.isArray(resourcesList)) {
    return [];
  }

  const remainingNeeded = Math.max(0, Number(need.quantityRequired || 0) - Number(need.quantityFulfilled || 0));
  if (remainingNeeded <= 0) return [];

  const candidates = [];

  resourcesList.forEach((res) => {
    const availableQty = Number(res.availableQuantity ?? res.quantity ?? 0);
    if (availableQty <= 0) return;

    // Rule 1: Category
    const isCategoryMatch =
      (need.category || '').trim().toLowerCase() === (res.category || '').trim().toLowerCase();
    if (!isCategoryMatch) return;

    // Rule 2: Location
    const locA = (need.location || '').trim().toLowerCase();
    const locB = (res.location || '').trim().toLowerCase();
    const isLocationMatch = locA === locB || locA.includes(locB) || locB.includes(locA);

    let score = 50;
    if (isLocationMatch) score += 30;
    if (availableQty >= remainingNeeded) {
      score += 20;
    } else {
      score += Math.round((availableQty / remainingNeeded) * 20);
    }

    candidates.push({
      ...res,
      matchScore: Math.min(100, score),
      isLocationMatch,
      availableQty,
      maxAllocatable: Math.min(availableQty, remainingNeeded)
    });
  });

  return candidates.sort((a, b) => b.matchScore - a.matchScore);
}
