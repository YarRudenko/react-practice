/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/accessible-emoji */
import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState('');

  const filteredByUser = selectedUserId
    ? products.filter(p => p.user.id === selectedUserId)
    : products;

  const filteredProducts = search.trim()
    ? filteredByUser.filter(p =>
      p.name.toLowerCase().includes(search.trim().toLowerCase()))
    : filteredByUser;

  const resetFilters = () => {
    setSelectedUserId(null);
    setSearch('');
  };

  const handleUserFilter = userId => {
    setSelectedUserId(userId);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                className={selectedUserId === null ? 'is-active' : ''}
                onClick={(event) => { event.preventDefault(); handleUserFilter(null); }}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  className={selectedUserId === user.id ? 'is-active' : ''}
                  onClick={(event) => { event.preventDefault(); handleUserFilter(user.id); }}
                >
                  {user.name}
                </a>
              ))}
            </p>

              <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {search !== '' && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearch('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block">
              <button
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
                data-cy="ResetAllButton"
              >
                Reset all filters
              </button>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
          ) : (
            <table
              className='table is-striped is-narrow is-fullwidth'
              data-cy='ProductTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>

                    <td data-cy="ProductCategory">
                      {product.category.icon} - {product.category.title}
                    </td>

                    <td
                     data-cy="ProductUser"
                     className={
                       product.user.sex === 'm'
                         ? 'has-text-link'
                         : 'has-text-danger'
                     }
                   >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>


        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className="button is-success mr-6 is-outlined"
          >
            All
          </a>

          <a
            data-cy="Category"
            className="button mr-2 my-1 is-info"
            href="#/"
          >
            Category 1
          </a>

          <a data-cy="Category" className="button mr-2 my-1" href="#/">
            Category 2
          </a>

          <a
            data-cy="Category"
            className="button mr-2 my-1 is-info"
            href="#/"
          >
            Category 3
          </a>
          <a data-cy="Category" className="button mr-2 my-1" href="#/">
            Category 4
          </a>
          </div>
      </div>
    </div>
  );
};
