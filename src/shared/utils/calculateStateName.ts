export const calculateStateName = (statePrefix: string, stateName : string) => {
  return `${statePrefix}${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`
}
