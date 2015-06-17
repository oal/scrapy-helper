import urllib2
from bottle import route, run, template, request, static_file


@route('/get')
def get_url():
    url = request.GET.get('url')
    base = '/'.join(url.split('/')[:3])

    f = urllib2.urlopen(url)
    source = f.read()
    source = source.replace('<head>', '<head><base href="'+base+'">')
    return source


@route('/')
def index():
    return template('base')


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

run(host='localhost', port=8080, debug=True, reloader=True)