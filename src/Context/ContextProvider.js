import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
