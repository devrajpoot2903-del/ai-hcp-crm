import { useSelector } from 'react-redux'

/**
 * Typed selector hook for the Redux store.
 * @param {function} selector - Redux selector function
 */
const useAppSelector = (selector) => useSelector(selector)

export default useAppSelector
