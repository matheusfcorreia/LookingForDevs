
module.exports =  stringToArray = async (string) => {
  return await string.split(',').map(tech => tech.trim());
}
