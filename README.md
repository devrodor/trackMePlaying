# trackMePlaying

## Description

- VanillaJS app 
- Uses the free MobyGames API [IDGB](https://api-docs.igdb.com/) 
- Returns information about games (developer information, genre, etc...)
- It also functions as a "Gaming Journal," allowing you to organize games that you're currently playing, games you've finished, ...

## API use-cases

Get all games that are **only released** on playstation 4 AND PC

```bash
fields name,category,platforms;
where category = 0 & platforms = {48,6};
```





