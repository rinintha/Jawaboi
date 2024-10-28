from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('welcome.html')  # Replace with your welcome page if needed

@app.route('/story1')
def story1():
    return render_template('story1.html')

@app.route('/game1')
def game1():
    return render_template('game1.html')

@app.route('/story2')
def story2():
    return render_template('story2.html')

@app.route('/game2')
def game2():
    return render_template('game2.html')

@app.route('/story3')
def story3():
    return render_template('story3.html')

@app.route('/game3')
def game3():
    return render_template('game3.html')

@app.route('/final')
def final_page():
    return render_template('final.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
