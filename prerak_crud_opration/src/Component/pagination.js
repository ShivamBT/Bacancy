import React from 'react';
import './pagination.css';

import { NavLink } from 'react-router-dom';

const Pagination = () => (


<div class="pagination">
  <a href="reactjs.org">&laquo;</a>
  <a class="active" href="reactjs.org">1</a>
  <a href="reactjs.org">2</a>
  <a href="reactjs.org">3</a>
  <a href="reactjs.org">4</a>
  <a href="reactjs.org">&raquo;</a>
</div>

);

export default Pagination;