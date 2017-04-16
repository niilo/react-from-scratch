import Axios from 'axios'

export function battle (players) {
  return Axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
}

function getProfile (username) {
  return Axios.get('https://api.github.com/users/' + username).then(user => {
    return user.data
  })
}

function getRepos (username) {
  return Axios.get(
    'https://api.github.com/users/' + username + '/repos' + '?per_page=100'
  )
}

function getStartCount (repos) {
  return repos.data.reduce(
    (count, repo) => {
      return count + repo.stargazers_count
    },
    0
  )
}

function calculateScore (profile, repos) {
  const followers = profile.followers
  const totalStars = getStartCount(repos)
  return followers * 3 + totalStars
}

function handleError (error) {
  console.warn(error)
  return null
}

function getUserData (player) {
  return Axios.all([getProfile(player), getRepos(player)]).then(data => {
    const profile = data[0]
    const repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort((a, b) => {
    return b.score - a.score
  })
}

export function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(
    'https://api.github.com/search/repositories?q=stars:>1+language:' +
      language +
      '&sort=stars&order=desc&type=Repositories'
  )
  return Axios.get(encodedURI).then(reponse => {
    return reponse.data.items
  })
}
