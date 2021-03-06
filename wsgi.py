#!/usr/bin/python
import os

virtenv = os.path.join(os.environ.get('OPENSHIFT_PYTHON_DIR','.'), 'virtenv')
virtualenv = os.path.join(virtenv, 'bin/activate_this.py')
try:
    with open(virtualenv) as f:
      code = compile(f.read(), "somefile.py", 'exec')
      exec(code, dict(__file__=virtualenv))

except IOError:
    print("This doesn't work")
    pass
#
# IMPORTANT: Put any additional includes below this line.  If placed above this
# line, it's possible required libraries won't be in your searchable path
#

from ranalyze import flask_app as application

if __name__ == '__main__':
    
    from wsgiref.simple_server import make_server
    httpd = make_server('localhost', 8051, application)
    # Wait for a single request, serve it and quit.
    httpd.serve_forever()
