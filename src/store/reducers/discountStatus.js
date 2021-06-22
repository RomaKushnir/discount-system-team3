import { createSelector } from 'reselect';
// import discountsList from '../../mockData/discountsList';

function getDiscountStatus(discountsList, filter) {
  const now = new Date();
  switch (filter) {
    case 'SHOW_ALL':
      return discountsList;
    case 'SHOW_ARCHIEVE':
      return discountsList.filter((discount) => discount.expirationDate);
    case 'SHOW_ACTIVE':
      return discountsList.filter((t) => !t.completed);
    default:
  }
}

function mapStateToProps(state) {
  return {
    discountsList: getDiscountStatus(state.discountsList, state.visibilityFilter)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;