# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: security.py
# Description: Used to hash and unhash user password 

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

import bcrypt

#get password and encode it 
def hash_password(password: str) -> str:
    #convert to bytes
    pwd_bytes = password.encode('utf-8')
    #generate salt and hash
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

#verify password for match
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
