# FOR WINDOWS USERS
#setup.ps1 - Run this in PowerShell

# Create virtual environment if it doesn't exist
if (-Not (Test-Path -Path ".\venv")) {
    python -m venv venv
}

# Activate the virtual environment
& .\venv\Scripts\Activate.ps1

# Upgrade pip and install requirements
python -m pip install --upgrade pip
pip install -r requirements.txt

# (Optional) If you use git submodules, uncomment this line:
# git submodule update --init --recursive

Write-Host "Setup complete! Virtual environment activated."
Write-Host "Run scripts while 'venv' is activated."
