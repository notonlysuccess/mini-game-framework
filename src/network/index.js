import login from './login'
import getGameInfo from './getGameInfo'
import decryptWXData from './decryptWXData'

class Network {
}

Network.login = login.bind(Network)
Network.getGameInfo = getGameInfo.bind(Network)
Network.decryptWXData = decryptWXData.bind(Network)

export default Network
