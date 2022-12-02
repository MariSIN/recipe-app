import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import Context from './Context';

function ContextProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState({
    searchName: '',
    selectedFilter: '',
  });
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = useCallback(({ target }) => {
    setSearchFilter({
      ...searchFilter,
      [target.name]: target.value,
    });
  }, [searchFilter]);

  const value = useMemo(() => ({
    searchFilter,
    setSearchFilter,
    handleChange,
    setSearchResult,
    searchResult,
  }), [searchFilter, handleChange, searchResult]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
