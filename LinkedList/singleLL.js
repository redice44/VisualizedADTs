function SinglyLinkedList() {
  this.start = null;
}

function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

SinglyLinkedList.prototype.insert = function(node) {
  if (this.start) {
    node.next = this.start;
    this.start = node;
  } else {
    this.start = node;
  }
};

SinglyLinkedList.prototype.find = function(data) {
  var curNode = this.start;
  while (curNode !== null && curNode.data !== data) {
    curNode = curNode.next;
  }

  if (curNode) {
    return true;    
  }
  return false;
};

SinglyLinkedList.prototype.remove = function(data) {
  var curNode = this.start;
  if (this.start && this.start.data === data) {
    this.start = this.start.next;
    return true;
  }

  while (curNode.next !== null && curNode.next.data !== data) {
    curNode = curNode.next;
  }

  if (curNode.next) {
    curNode.next = curNode.next.next;
    return true;
  }
  return false;
};

SinglyLinkedList.prototype.toString = function() {
  var out = '';
  var delim = ' -> ';
  var curNode = this.start;

  while (curNode !== null) {
    out += curNode.data + delim;
    curNode = curNode.next;
  }

  return out.substr(0, out.length - delim.length);
};

SinglyLinkedList.prototype.getStart = function() {
  return this.start;
};

SinglyLinkedListNode.prototype.getData = function() {
  return this.data;
};

SinglyLinkedListNode.prototype.hasNext = function() {
  return this.next !== null;
};