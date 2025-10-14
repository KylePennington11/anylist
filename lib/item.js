const FormData = require('form-data');
const uuid = require('./uuid');

const OP_MAPPING = {
	name: 'set-list-item-name',
	quantity: 'set-list-item-quantity',
	details: 'set-list-item-details',
	checked: 'set-list-item-checked',
	categoryMatchId: 'set-list-item-category-match-id',
	manualSortIndex: 'set-list-item-sort-order',
};

/**
 * Item class.
 * @class
 *
 * @param {object} item item
 * @param {object} context context
 *
 * @property {string} listId
 * @property {string} identifier
 * @property {string} name
 * @property {string} details
 * @property {string} quantity
 * @property {string} checked
 * @property {string} manualSortIndex
 * @property {string} userId
 * @property {string} categoryMatchId
 */
class Item {
	/**
   * @hideconstructor
   */
	constructor(i, {client, protobuf, uid}) {
		this._listId = i.listId;
		this._identifier = i.identifier || uuid();
		this._name = i.name;
		this._details = i.details;
		this._quantity = i.quantity;
		this._checked = i.checked;
		this._manualSortIndex = i.manualSortIndex;
		this._userId = i.userId;
		this._categoryMatchId = i.categoryMatchId || 'other';

		// Additional ListItem fields
		this._serverModTime = i.serverModTime;
		this._recipeId = i.recipeId;
		this._rawIngredient = i.rawIngredient;
		this._priceMatchupTag = i.priceMatchupTag;
		this._priceId = i.priceId;
		this._category = i.category;
		this._photoIds = i.photoIds || [];
		this._eventId = i.eventId;
		this._storeIds = i.storeIds || [];
		this._prices = i.prices || [];
		this._categoryAssignments = i.categoryAssignments || [];
		this._quantityPb = i.quantityPb;
		this._priceQuantityPb = i.priceQuantityPb;
		this._priceQuantityShouldOverrideItemQuantity = i.priceQuantityShouldOverrideItemQuantity;
		this._packageSizePb = i.packageSizePb;
		this._pricePackageSizePb = i.pricePackageSizePb;
		this._pricePackageSizeShouldOverrideItemPackageSize = i.pricePackageSizeShouldOverrideItemPackageSize;
		this._ingredients = i.ingredients || [];
		this._itemQuantityShouldOverrideIngredientQuantity = i.itemQuantityShouldOverrideIngredientQuantity;
		this._itemPackageSizeShouldOverrideIngredientPackageSize = i.itemPackageSizeShouldOverrideIngredientPackageSize;
		this._productUpc = i.productUpc;
		this._deprecatedQuantity = i.deprecatedQuantity;

		this._client = client;
		this._protobuf = protobuf;
		this._uid = uid;

		this._fieldsToUpdate = [];
	}

	toJSON() {
		return {
			listId: this._listId,
			identifier: this._identifier,
			name: this._name,
			details: this._details,
			quantity: this._quantity,
			checked: this._checked,
			manualSortIndex: this._manualSortIndex,
			userId: this._userId,
			categoryMatchId: this._categoryMatchId,
			serverModTime: this._serverModTime,
			recipeId: this._recipeId,
			rawIngredient: this._rawIngredient,
			priceMatchupTag: this._priceMatchupTag,
			priceId: this._priceId,
			category: this._category,
			photoIds: this._photoIds,
			eventId: this._eventId,
			storeIds: this._storeIds,
			prices: this._prices,
			categoryAssignments: this._categoryAssignments,
			quantityPb: this._quantityPb,
			priceQuantityPb: this._priceQuantityPb,
			priceQuantityShouldOverrideItemQuantity: this._priceQuantityShouldOverrideItemQuantity,
			packageSizePb: this._packageSizePb,
			pricePackageSizePb: this._pricePackageSizePb,
			pricePackageSizeShouldOverrideItemPackageSize: this._pricePackageSizeShouldOverrideItemPackageSize,
			ingredients: this._ingredients,
			itemQuantityShouldOverrideIngredientQuantity: this._itemQuantityShouldOverrideIngredientQuantity,
			itemPackageSizeShouldOverrideIngredientPackageSize: this._itemPackageSizeShouldOverrideIngredientPackageSize,
			productUpc: this._productUpc,
			deprecatedQuantity: this._deprecatedQuantity,
		};
	}

	_encode() {
		return new this._protobuf.ListItem({
			identifier: this._identifier,
			listId: this._listId,
			name: this._name,
			quantity: this._quantity,
			details: this._details,
			checked: this._checked,
			category: this._category,
			userId: this._userId,
			categoryMatchId: this._categoryMatchId,
			manualSortIndex: this._manualSortIndex,
			serverModTime: this._serverModTime,
			recipeId: this._recipeId,
			rawIngredient: this._rawIngredient,
			priceMatchupTag: this._priceMatchupTag,
			priceId: this._priceId,
			photoIds: this._photoIds,
			eventId: this._eventId,
			storeIds: this._storeIds,
			prices: this._prices,
			categoryAssignments: this._categoryAssignments,
			quantityPb: this._quantityPb,
			priceQuantityPb: this._priceQuantityPb,
			priceQuantityShouldOverrideItemQuantity: this._priceQuantityShouldOverrideItemQuantity,
			packageSizePb: this._packageSizePb,
			pricePackageSizePb: this._pricePackageSizePb,
			pricePackageSizeShouldOverrideItemPackageSize: this._pricePackageSizeShouldOverrideItemPackageSize,
			ingredients: this._ingredients,
			itemQuantityShouldOverrideIngredientQuantity: this._itemQuantityShouldOverrideIngredientQuantity,
			itemPackageSizeShouldOverrideIngredientPackageSize: this._itemPackageSizeShouldOverrideIngredientPackageSize,
			productUpc: this._productUpc,
			deprecatedQuantity: this._deprecatedQuantity,
		});
	}
	// Additional getters/setters for new fields
	get serverModTime() { return this._serverModTime; }
	set serverModTime(v) { this._serverModTime = v; this._fieldsToUpdate.push('serverModTime'); }

	get recipeId() { return this._recipeId; }
	set recipeId(v) { this._recipeId = v; this._fieldsToUpdate.push('recipeId'); }

	get rawIngredient() { return this._rawIngredient; }
	set rawIngredient(v) { this._rawIngredient = v; this._fieldsToUpdate.push('rawIngredient'); }

	get priceMatchupTag() { return this._priceMatchupTag; }
	set priceMatchupTag(v) { this._priceMatchupTag = v; this._fieldsToUpdate.push('priceMatchupTag'); }

	get priceId() { return this._priceId; }
	set priceId(v) { this._priceId = v; this._fieldsToUpdate.push('priceId'); }

	get category() { return this._category; }
	set category(v) { this._category = v; this._fieldsToUpdate.push('category'); }

	get photoIds() { return this._photoIds; }
	set photoIds(v) { this._photoIds = v; this._fieldsToUpdate.push('photoIds'); }

	get eventId() { return this._eventId; }
	set eventId(v) { this._eventId = v; this._fieldsToUpdate.push('eventId'); }

	get storeIds() { return this._storeIds; }
	set storeIds(v) { this._storeIds = v; this._fieldsToUpdate.push('storeIds'); }

	get prices() { return this._prices; }
	set prices(v) { this._prices = v; this._fieldsToUpdate.push('prices'); }

	get categoryAssignments() { return this._categoryAssignments; }
	set categoryAssignments(v) { this._categoryAssignments = v; this._fieldsToUpdate.push('categoryAssignments'); }

	get quantityPb() { return this._quantityPb; }
	set quantityPb(v) { this._quantityPb = v; this._fieldsToUpdate.push('quantityPb'); }

	get priceQuantityPb() { return this._priceQuantityPb; }
	set priceQuantityPb(v) { this._priceQuantityPb = v; this._fieldsToUpdate.push('priceQuantityPb'); }

	get priceQuantityShouldOverrideItemQuantity() { return this._priceQuantityShouldOverrideItemQuantity; }
	set priceQuantityShouldOverrideItemQuantity(v) { this._priceQuantityShouldOverrideItemQuantity = v; this._fieldsToUpdate.push('priceQuantityShouldOverrideItemQuantity'); }

	get packageSizePb() { return this._packageSizePb; }
	set packageSizePb(v) { this._packageSizePb = v; this._fieldsToUpdate.push('packageSizePb'); }

	get pricePackageSizePb() { return this._pricePackageSizePb; }
	set pricePackageSizePb(v) { this._pricePackageSizePb = v; this._fieldsToUpdate.push('pricePackageSizePb'); }

	get pricePackageSizeShouldOverrideItemPackageSize() { return this._pricePackageSizeShouldOverrideItemPackageSize; }
	set pricePackageSizeShouldOverrideItemPackageSize(v) { this._pricePackageSizeShouldOverrideItemPackageSize = v; this._fieldsToUpdate.push('pricePackageSizeShouldOverrideItemPackageSize'); }

	get ingredients() { return this._ingredients; }
	set ingredients(v) { this._ingredients = v; this._fieldsToUpdate.push('ingredients'); }

	get itemQuantityShouldOverrideIngredientQuantity() { return this._itemQuantityShouldOverrideIngredientQuantity; }
	set itemQuantityShouldOverrideIngredientQuantity(v) { this._itemQuantityShouldOverrideIngredientQuantity = v; this._fieldsToUpdate.push('itemQuantityShouldOverrideIngredientQuantity'); }

	get itemPackageSizeShouldOverrideIngredientPackageSize() { return this._itemPackageSizeShouldOverrideIngredientPackageSize; }
	set itemPackageSizeShouldOverrideIngredientPackageSize(v) { this._itemPackageSizeShouldOverrideIngredientPackageSize = v; this._fieldsToUpdate.push('itemPackageSizeShouldOverrideIngredientPackageSize'); }

	get productUpc() { return this._productUpc; }
	set productUpc(v) { this._productUpc = v; this._fieldsToUpdate.push('productUpc'); }

	get deprecatedQuantity() { return this._deprecatedQuantity; }
	set deprecatedQuantity(v) { this._deprecatedQuantity = v; this._fieldsToUpdate.push('deprecatedQuantity'); }

	get identifier() {
		return this._identifier;
	}

	set identifier(_) {
		throw new Error('You cannot update an item ID.');
	}

	get listId() {
		return this._listId;
	}

	set listId(l) {
		if (this._listId === undefined) {
			this._listId = l;
			this._fieldsToUpdate.push('listId');
		} else {
			throw new Error('You cannot move items between lists.');
		}
	}

	get name() {
		return this._name;
	}

	set name(n) {
		this._name = n;
		this._fieldsToUpdate.push('name');
	}

	get quantity() {
		return this._quantity;
	}

	set quantity(q) {
		if (typeof q === 'number') {
			q = q.toString();
		}

		this._quantity = q;
		this._fieldsToUpdate.push('quantity');
	}

	get details() {
		return this._details;
	}

	set details(d) {
		this._details = d;
		this._fieldsToUpdate.push('details');
	}

	get checked() {
		return this._checked;
	}

	set checked(c) {
		if (typeof c !== 'boolean') {
			throw new TypeError('Checked must be a boolean.');
		}

		this._checked = c;
		this._fieldsToUpdate.push('checked');
	}

	get userId() {
		return this._userId;
	}

	set userId(_) {
		throw new Error('Cannot set user ID of an item after creation.');
	}

	get categoryMatchId() {
		return this._categoryMatchId;
	}

	set categoryMatchId(i) {
		this._categoryMatchId = i;
		this._fieldsToUpdate.push('categoryMatchId');
	}

	get manualSortIndex() {
		return this._manualSortIndex;
	}

	set manualSortIndex(i) {
		if (typeof i !== 'number') {
			throw new TypeError('Sort index must be a number.');
		}

		this._manualSortIndex = i;
		this._fieldsToUpdate.push('manualSortIndex');
	}

	/**
   * Save local changes to item to
   * AnyList's API.
   * Must set `isFavorite=true` if editing "favorites" list
   * @param {boolean} [isFavorite=false]
   * @return {Promise}
   */
	async save(isFavorite = false) {
		const ops = this._fieldsToUpdate.map(field => {
			const value = this[field];
			const opName = OP_MAPPING[field];

			const op = new this._protobuf.PBListOperation();

			op.setMetadata({
				operationId: uuid(),
				handlerId: opName,
				userId: this._uid,
			});

			op.setListId(this._listId);
			op.setListItemId(this._identifier);

			if (typeof value === 'boolean') {
				op.setUpdatedValue(value === true ? 'y' : 'n');
			} else {
				op.setUpdatedValue(value.toString());
			}

			return op;
		});

		const opList = new this._protobuf.PBListOperationList();

		opList.setOperations(ops);

		const form = new FormData();

		form.append('operations', opList.toBuffer());

		await this._client.post(isFavorite ? 'data/starter-lists/update' : 'data/shopping-lists/update', {
			body: form,
		});
	}
}

module.exports = Item;
