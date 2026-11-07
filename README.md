# Quiz-app

Quiz app
A quiz app built with vanilla JavaScript, HTML and CSS. Users choose a topic, answer questions within a time limit and see their results.

Live app: [https://bucolic-heliotrope-3cc57f.netlify.app]

Team

Name
Github
Resposibility

Emma Hagelin  
EmmaHagelin
Home page and notification popup

Andrija Dokic
andrijadjokic07-png
Profile, login, signup

Samuel Goitom Gezai
SamuelGoitomGezai
Questions page, timer, question data and photo credits

Abdul Rahman Al Hanbili
abdul060
Scoreboard, footer, main.css

Gogita Nikabadze
teddyyGO
Leaderboard, Scoreboard JavaScript


How the app works:
The user signs up or logs in.
On the Home page, the user chooses a topic; Capitals, Artists or Sports.
The quiz starts with a time limit of 2 minutes.
The user answers the questions and get immediate feedback on each answer.
The result is saved in localStorage and shown on the Scoreboard page.
The Leaderboard page shows the user’s total points alongside other players.
The popup on the home page suggests what to play next, based on the latest round.
The Profile page shows the user’s statistics and settings.

Sketches

Wireframes
![Wireframes](assets/wireframe.png)

Figma design
![Figma](assets/figmasketches.png)
[Open the design in figma](https://www.figma.com/design/JSbaypCY8vyrupchz2BVmP/Quiz-app---uo3?node-id=254-292)

Data model
## Data model

```json
{
  "topic": "capitals",
  "difficulty": "easy",
  "questions": [
    {
      "id": "capitals-01",
      "question": "Which capital city is this?",
      "image": {
        "src": "../assets/questions/stockholm.jpg",
        "alt": "A waterfront lined with pastel-coloured historic buildings and steep red roofs.",
        "author": "OleNeitzel",
        "authorUrl": "https://commons.wikimedia.org/wiki/User:OleNeitzel",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
      },
      "answers": [
        { "id": "stockholm", "text": "Stockholm" },
        { "id": "copenhagen", "text": "Copenhagen" },
        { "id": "oslo", "text": "Oslo" }
      ],
      "correctAnswerId": "stockholm"
    }
  ]
}
```

Reflection

Strengths
We were good at working separately. In group discussions we had, we organized ourselves around different tasks which had to be done by certain deadlines that we chose. Everyone respected those deadlines. 
We were effective with the time we had working together, both on lectures and outside of them. 

Weaknesses
The connection between profile page and statics on leaderboard/question page is missing. (stats do not get applied on profile page)
It was challenging to organize ourselves, we had too little meetings with people not joining each time. 

What would we do differently?
Find better times which suits everyone. 


Use of AI
Emma Hagelin: Used AI to generate images based on our sketches. I compared the generated pictures to the sketches and checked that they matched our design before we used them in the app. I also used Claude to help with some debugging if stuck.

Andrija Dokic: I used AI for the assistance of giving me suggestions on how to approach making different modules and the whole profile system. LocalStorage() and import were new terms for me and other ones like try & catch were still new for me so I had problems writing the whole thing on my own. 

Andrija Dokic

Samuel Goitom Gezai: I used AI to help me build the Questions page, for example with parts of the HTML and CSS, turning our questions into JSON, finding photos with free licences and fixing bugs. I always read through the code so I understood it, and I wrote and changed parts of it myself. After every change I played through the quiz to see that it worked.

Abdul Rahman Al Hanbali 

Gogita Nikabadze
