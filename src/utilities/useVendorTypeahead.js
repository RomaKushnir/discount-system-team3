import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const useVendorTypeahead = () => {
  const dispatch = useDispatch();

  const onVendorSelectInputChange = (characters) => {
    dispatch(actions.vendorActions.getTypeaheadVendors(characters));
  };

  const onVendorSelectBlur = () => {
    dispatch(actions.vendorActions.clearVendorsTypeahead());
  };

  return [onVendorSelectInputChange, onVendorSelectBlur];
};

export default useVendorTypeahead;
