// Rule 2 (compatibility): every deal needs exactly REQUIRED_CHOICES drink, from its own list.
export const REQUIRED_CHOICES = 1;

// Works out the new selection after the user clicks an option.
// - Clicking a selected option un-selects it (so it can be picked again).
// - Clicking another option replaces the old one, so the count never goes above the limit.
export function nextSelection(current, choiceId, limit = REQUIRED_CHOICES) {
  if (current.includes(choiceId)) {
    return current.filter((id) => id !== choiceId);
  }
  return [...current, choiceId].slice(-limit);
}

// Checks a selection against the deal. Returns { ok, message }.
export function checkDealChoice(deal, selectedIds) {
  const label = deal.choiceLabel.toLowerCase();
  if (selectedIds.length < REQUIRED_CHOICES) {
    return { ok: false, message: `Choose ${REQUIRED_CHOICES} ${label} to continue.` };
  }
  if (selectedIds.length > REQUIRED_CHOICES) {
    return { ok: false, message: `Choose only ${REQUIRED_CHOICES} ${label}.` };
  }
  if (!deal.choiceIds.includes(selectedIds[0])) {
    return { ok: false, message: `That ${label} is not part of this deal.` };
  }
  return { ok: true, message: "" };
}