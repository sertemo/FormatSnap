
# Copyright 2024 Sergio Tejedor Moreno

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, request, send_file, render_template
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('src/formatsnap/templates/index.html')

@app.route('/convert', methods=['POST'])
def convert():
    file = request.files['file']
    format = request.form['format']
    img = Image.open(file.stream)
    
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format=format)
    img_byte_arr.seek(0)

    return send_file(
        img_byte_arr,
        mimetype=f'image/{format.lower()}',
        as_attachment=True,
        download_name=f'converted.{format.lower()}'
        )

if __name__ == '__main__':
    app.run(debug=True, port=6969)
