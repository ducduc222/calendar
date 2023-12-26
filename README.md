ITSS Japanese 1
Environment:
  + Visual studio code
  + Intellij idea
Programming language:
  + java jdk 20
  + ReactJs
  + Node v18

Installation:
Step 1: git clone git@github.com:nguyenthiquynhnga/calendar.git
Step 2: + open folder /taskbe with Intellij idea
        + open folder /taskfe with Visual studio code
Step 3:
  /taskbe:
    - install dependences
    - Edit file resource/application.yml:

    url: 'your url mysql jdbc'
    username: your DATABASE_USERNAME
    password: your DATABASE_PASSWORD
  /taskfe:
    - npm install (or npm install --force)
Step 4:
  /taskbe:
    run file TaskBeApplication
  /taskfe:
    npm run dev
