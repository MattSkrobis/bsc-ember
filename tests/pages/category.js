import {
  create,
  collection,
  clickable,
  text,
  visitable,
  fillable } from 'ember-cli-page-object';

export default create({
  categories: collection({
    itemScope: '[data-test-category-item]',
    item: {
      open: clickable('[data-test-category-show-link]'),
      thumbName: text('[data-test-category-thumb-name]')
    }
  }),
  visit: visitable('/categories'),
  categoryName: text('[data-test-category-show-name]'),
  openNewCategory: clickable('[data-test-categories-new-link]'),
  openCategories: clickable('[data-test-categories-link]'),
  edit: clickable('[data-test-category-edit-link]'),
  editCategoryName: fillable('input', { at: 0 }),
  editCategoryNameError: text("li:contains('Name can')"),
  delete: clickable('[data-test-category-destroy-button]'),
  cancelDelete: clickable('[data-test-cancel-button]'),
  confirmDelete: clickable('[data-test-confirm-button]'),
  saveCategory: clickable('[data-test-category-form-save-button]')
});
