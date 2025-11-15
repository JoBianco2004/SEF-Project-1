
#NewChat
#Helps with routing and logic
from Flask import Flask, request, jsonify

#It's using the python module to find files and resources. By
#being labeled as __name__. If needed can be changed to a more 
#specfic label but will require more work. Think this works fine.
app = Flask(__name__)
 
chat_sessions = {}

@app.route('/new_chat', methods=['POST'])
def new_chat():
    user_id = request.json.get('user_id')
    chat_sessions[user_id] = [] 
    return jsonify({"message": "New chat started."})

@app.route('/send_message', methods=['POST'])
def send_message():
    user_id = request.json.get('user_id')
    message = request.json.get('message')

    # Check if in chat
    if user_id not in chat_sessions:
        chat_sessions[user_id] = []

    chat_sessions[user_id].append({"user": message})
    response = f"Echo: {message}"
    chat_sessions[user_id].append({"bot": response})

    return jsonify({"response": response})