export function generateActionsFor(map = {}) {
  return Object.keys(map).reduce((acc, key) => {
    acc[key] = ({ commit }, payload) => {
      commit(map[key], payload)
    }
    return acc
  }, {})
}

export function generateMutationsFor(list = []) {
  return list.reduce((map, item) => {
    return {
      ...map,
      [item]: item
    }
  }, {})
}
