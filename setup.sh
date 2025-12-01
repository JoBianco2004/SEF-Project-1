# FOR MAC AND LINUX USERS
#!/bin/bash
# setup.sh - Run this in terminal: bash setup.sh

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip and install requirements
pip install --upgrade pip
pip install -r requirements.txt

# (Optional) If you use git submodules, uncomment this line:
# git submodule update --init --recursive

echo "Setup complete! Virtual environment activated."
echo "Run scripts while 'venv' is activated."
