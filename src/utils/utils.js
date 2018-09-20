import axios from 'axios'

const apiHost = 'http://api.cm.dev.yunpub.cn'
const fileHost = 'http://api.cm.dev.yunpub.cn'

const graphqlQuery = (query, variables) => {
  const result = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${apiHost}/graphql`,
      withCredentials: true,
      data: {
        query,
        variables
      }
    }).then(res => {
      if (res.data && res.data.errors) {
        reject(new Error(res.data.errors[0].message))
      } else if (res.data && res.data.data) {
        resolve(res.data.data)
      }
    }).catch(() => {
      reject(new Error('请求失败'))
    })
  })
  return result
}


const exportsObject = {
  apiHost,
  fileHost,
  query: graphqlQuery,
  mutate: graphqlQuery,
}

export default exportsObject
