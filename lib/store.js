/**
 * Store class.
 * @class
 *
 * @param {object} store store
 * @param {object} context context
 *
 * @property {string} identifier
 * @property {string} name
 * @property {string} listId
 * @property {number} sortIndex
 * @property {number} logicalTimestamp
 */
class Store {
	/**
   * @hideconstructor
   */
	constructor(store, context = {}) {
		this._identifier = store.identifier;
		this._name = store.name;
		this._listId = store.listId;
		this._sortIndex = store.sortIndex;
		this._logicalTimestamp = store.logicalTimestamp;

		this._context = context;
	}

	toJSON() {
		return {
			identifier: this._identifier,
			name: this._name,
			listId: this._listId,
			sortIndex: this._sortIndex,
			logicalTimestamp: this._logicalTimestamp,
		};
	}

	get identifier() {
		return this._identifier;
	}

	get name() {
		return this._name;
	}

	get listId() {
		return this._listId;
	}

	get sortIndex() {
		return this._sortIndex;
	}

	get logicalTimestamp() {
		return this._logicalTimestamp;
	}
}

module.exports = Store;
