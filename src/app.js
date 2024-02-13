const PLAYERS = [
  'Spiderman',
  'Captain America',
  'Wonderwoman',
  'Popcorn',
  'Gemwoman',
  'Bolt',
  'Antwoman',
  'Mask',
  'Tiger',
  'Captain',
  'Catwoman',
  'Fish',
  'Hulk',
  'Ninja',
  'Black Cat',
  'Volverine',
  'Thor',
  'Slayer',
  'Vader',
  'Slingo',
];

// user Class
class user {
  constructor(id, playername, typo) {
    this.id = id;
    this.playername = playername;
    this.image = 'images/super-' + (id + 1) + '.png';
    this.strength = this.getRandomStrength();
    this.typo = typo;

    this.selected = false;
    this.wins = 0;
  }

  // Get random strength
  getRandomStrength = () => {
    return Math.ceil(Math.random() * 100);
  };

  // Create a player for displaying
  view = () => {
    let player = document.createElement('div');
    player.classList.add('player');
    player.setAttribute('data-id', this.id);

    if (this.selected == true) player.classList.add('selected');
    let image = document.createElement('img');
    image.setAttribute('src', this.image);
    let playername = document.createElement('div');

    playername.textContent = this.playername;
    let strength = document.createElement('div');
    strength.textContent = this.strength;
    strength.className = 'strength';
    player.append(image, playername, strength);

    return player;
  };
}

// Superwar Class
class Superwar {
  constructor(players) {
    this.players = players.map((player, i) => {
      let typo = i % 2 == 0 ? 'hero' : 'villain';
      return new user(i, player, typo);
    });
    this.score = { hero: 0, villain: 0 };

    this.strength = { hero: 0, villain: 0 };
    this.wins = { hero: 0, villain: 0 };

    Array.from(document.getElementsByClassName('team')).forEach((elem) =>
      elem.addEventListener('click', (e) => {
        this.handleSelection(e.target);
      })
    );
  }

  // Display players in HTML
  viewPlayers = () => {
    let team = document.getElementById('heroes');
    team.innerHTML = '';

    let fragment = this.buildPlayers('hero');
    team.append(fragment);

    team = document.getElementById('villains');
    team.innerHTML = '';

    fragment = this.buildPlayers('villain');
    team.append(fragment);
  };

  // Build players fragment
  buildPlayers = (typo) => {
    let fragment = document.createDocumentFragment();
    this.filterPlayers(typo).forEach((player) =>
      fragment.append(player.view())
    );
    return fragment;
  };

  // Filter Players based on typo
  filterPlayers = (typo) => {
    return this.players.filter((player) => player.typo == typo);
  };

  // Handle player clicks
  handleSelection = (target) => {
    if (!target.classList.contains('player')) target = target.parentNode;

    if (!target.hasAttribute('data-id')) return;

    let selectedId = target.getAttribute('data-id');
    let selectedPlayer = this.players[selectedId];

    this.players
      .filter((player) => player.typo == selectedPlayer.typo)
      .forEach((player) => (player.selected = false));
    selectedPlayer.selected = true;

    if (this.isFight(selectedPlayer.strength) === 'clash') this.fight();
    else this.viewPlayers();
  };

  // Progression 1: Check for fight
  isFight = (strength) => {
    // Type your code here
    if (strength > 0) {
      return 'clash';
    } else {
      return 'peace';
    }

    // return  'c;
  };

  // Fight
  fight = () => {
    let score = this.calculateScore();

    let finalScore = document.getElementById('score');

    finalScore.innerHTML = '1 - 0';

    if (this.checkWin() !== 'endure')
      setTimeout(() => this.announceWinner(score), 100);

    return finalScore;
  };

  // Progression 2: Calculate score
  calculateScore = () => {
    // re of teams
    // Type your code here

    let setWinner = this.updateWin();
    let score = this.score;
    this.players.map((player) => {
      if (player.typo == 'hero') {
        player.win = setWinner['hero'];
        score['hero'] += player.wins;
      } else {
        player.win = setWinner['villain'];
        score['villain'] += player.wins;
      }
    });

    return score;
  };

  // Progression 3: Check whether there is a win
  checkWin = () => {
    // Find the winner if exists return typo hero or villain

    let result = 'endure';
    let health = {
      hero: this.totalStrength('hero'),
      villain: this.totalStrength('villain'),
    };

    result =
      health['hero'] > health['villain']
        ? 'hero'
        : health['hero'] == health['villain']
        ? 'endure'
        : 'villain';

    return result;
  };

  updateWin = () => {
    let win = { hero: 0, villain: 0, draw: 0 };
    let winner = this.checkWin();
    if (winner == 'hero') {
      win['hero'] += 1;
    } else if (winner == 'villain') {
      win['villain'] += 1;
    } else {
      win['draw'] += 1;
    }

    return win;
  };

  // Progression 4: Find total strength of a team
  totalStrength = (typo) => {
    // Calculate and return the total strength of the team
    // Type your code here
    let strength = this.strength;
    this.players.map((player) => {
      if (player.typo == 'hero') {
        strength['hero'] += player.strength;
      } else {
        strength['villain'] += player.strength;
      }
    });

    return strength[typo];
  };

  // Announce the winner
  announceWinner = (score) => {
    console.log(score['hero']);

    if (score['hero'] == score['villain']) alert('Its a draw!');
    else if (score['hero'] > score['villain']) alert('Heroes Win!');
    else alert('Villains Win!');
    location.reload();
  };
}

window.onload = () => {
  const superwar = new Superwar(PLAYERS);
  superwar.viewPlayers();
};
