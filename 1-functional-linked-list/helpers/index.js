'use strict';

function markImmutableDataStructure (listNode) {
  listNode._next = listNode.next;
  listNode.changed = false;

  Object.defineProperty(listNode, 'next', {

    set (value) {
      this._next = value;
      this.changed = true;
    },
    get (value) {
      return this._next;
    }
  });
}

function hasImmutableChanged (listNode) {
  if (listNode === null) {
    return false;
  } else if (listNode.changed === true || listNode.changed === undefined) {
    return true;
  } else {
    return hasImmutableChanged(listNode.next);
  }
}

module.exports = { markImmutableDataStructure, hasImmutableChanged };
