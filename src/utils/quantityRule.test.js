import test from "node:test";
import assert from "node:assert/strict";
import { checkQuantity, MAX_QUANTITY } from "./quantityRule.js";

test("accepts a normal valid quantity", () => {
  assert.deepEqual(checkQuantity(3), { ok: true, message: "" });
});

test("accepts the maximum quantity of 10", () => {
  assert.equal(MAX_QUANTITY, 10);
  assert.deepEqual(checkQuantity(10), { ok: true, message: "" });
});

test("rejects a quantity above the maximum", () => {
  assert.deepEqual(checkQuantity(11), {
    ok: false,
    message: "You can order at most 10 of this item.",
  });
});
