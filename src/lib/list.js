/**
 * @constructor
 * @param {string} storageKey - The name of the key to be created in the localStorage
 */
function List(storageKey) {
  if (typeof storageKey !== 'string') throw Error();

  /**
   * The name of the key created in the localStorage
   * @member {string}
   */
  this.storageKey = storageKey;
  this.data = [];
  this.store(this.data);
}

/**
 * @param {string} storageKey
 * The name of the key to be retrieved the value of from the localStorage
 *
 * @returns {List}
 */
List.use = function use(storageKey) {
  const data = JSON.parse(localStorage.getItem(storageKey)) || [];

  const list = new List(storageKey);
  list.data = data;
  list.store();

  return list;
};

/**
 * @param {List} list
 * @returns {Array.<Object>}
 */
List.getTopChecked = function getTopChecked(list) {
  return list.data.filter((item) => item.checked);
};

/**
 * @param {List} list
 * @returns {Array.<Object>}
 */
List.getTopUnchecked = function getTopUnchecked(list) {
  return list.data.filter((item) => !item.checked);
};

/**
 * @instance
 */
List.prototype.store = function store() {
  localStorage.setItem(this.storageKey, JSON.stringify(this.data));
};

/**
 * @param {string} value
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.add = function add(value, id) {
  if (typeof value !== 'string') throw Error();

  const newItem = {
    value,
    id: uuidv4(),
    checked: false,
    children: [],
    expanded: true,
  };

  if (!id) {
    this.data.push(newItem);
  } else {
    const item = this.find(id);
    item.children.push({
      ...newItem,
      parentId: item.id,
    });

    this.uncheck(item.id);
  }

  this.store();
  return this;
};

/**
 * @param {string} id
 * The id of the list item that should be removed
 * @instance
 * @returns {List}
 */
List.prototype.remove = function remove(id) {
  const target = this.find(id);
  const targetParent = this.find(target.parentId);
  const targetContainer = targetParent
    ? targetParent.children
    : this.data;
  const targetIndex = targetContainer.findIndex((child) => child.id === id);

  targetContainer.splice(targetIndex, 1);

  this.store();
  return this;
};

/**
 * @param {string} id
 * @param {string} value
 * @instance
 * @returns {List}
 */
List.prototype.edit = function edit(id, value) {
  const item = this.find(id);
  item.value = value;
  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.check = function check(id) {
  const item = this.find(id);
  item.checked = true;

  const { children } = item;
  if (children.length) {
    children.forEach((child) => this.check(child.id));
  }

  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.uncheck = function uncheck(id) {
  const item = this.find(id);
  item.checked = false;

  const parent = this.find(item.parentId);
  if (parent) this.uncheck(parent.id);

  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.toggleCheck = function toggleCheck(id) {
  const item = this.find(id);
  if (item.checked) {
    this.uncheck(id);
  } else {
    this.check(id);
  }

  return this;
};

/**
 * @instance
 * @returns {List}
 */
List.prototype.checkAll = function checkAll() {
  this.data.forEach((item) => this.check(item.id));
  return this;
};

/**
 * @instance
 * @returns {List}
 */
List.prototype.uncheckAll = function uncheckAll(data = this.data) {
  data.forEach((item) => {
    if (!item.children.length) {
      this.uncheck(item.id);
    } else {
      this.uncheckAll(item.children);
    }
  });
  return this;
};

/**
 * @instance
 * @returns {List}
 */
List.prototype.removeChecked = function removeChecked(data = this.data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].checked) {
      data.splice(i, 1);
    } else if (data[i].children.length) {
      this.removeChecked(data[i].children);
    }
  }

  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.contract = function contract(id) {
  const item = this.find(id);
  item.expanded = false;

  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 * @returns {List}
 */
List.prototype.expand = function expand(id) {
  const item = this.find(id);
  item.expanded = true;

  this.store();
  return this;
};

/**
 * @param {string} id
 * @instance
 */
List.prototype.find = function find(id, data = this.data) {
  let found;

  function recurse(container) {
    for (let i = 0; i < container.length; i++) {
      if (container[i].id === id) {
        found = container[i];
        break;
      }

      if (container[i].children.length) {
        recurse(container[i].children);
      }
    }
  }
  recurse(data);

  return found;
};

export default List;

// Helper function to generate id
function uuidv4() {
  function replacer(c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> c / 4))
      .toString(16);
  }
  return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`
    .replace(/[018]/g, replacer);
}
