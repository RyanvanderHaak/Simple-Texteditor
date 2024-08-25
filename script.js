
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
      mode: 'xml',
      lineNumbers: true,
      theme: 'nature',
      extraKeys: {"Ctrl-Space": "autocomplete"},
      hintOptions: {schemaInfo: CodeMirror.htmlSchema}
  });

  const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
      mode: 'css',
      lineNumbers: true,
      theme: 'nature',
      extraKeys: {"Ctrl-Space": "autocomplete"}
  });

  const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'nature',
      extraKeys: {"Ctrl-Space": "autocomplete"}
  });


  document.getElementById('run-btn').addEventListener('click', () => {
      const htmlContent = htmlEditor.getValue();
      const cssContent = `<style>${cssEditor.getValue()}</style>`;
      const jsContent = `<script>${jsEditor.getValue()}<\/script>`;
      const output = document.getElementById('output');

      output.contentDocument.body.innerHTML = htmlContent + cssContent + jsContent;
  });

  document.getElementById('theme-selector').addEventListener('change', (e) => {
      const theme = e.target.value;
      htmlEditor.setOption('theme', theme);
      cssEditor.setOption('theme', theme);
      jsEditor.setOption('theme', theme);
  });

  document.getElementById('export-btn').addEventListener('click', () => {
      const htmlContent = htmlEditor.getValue();
      const cssContent = cssEditor.getValue();
      const jsContent = jsEditor.getValue();

      const zip = new JSZip();
      zip.file("index.html", htmlContent);
      zip.file("styles.css", cssContent);
      zip.file("scripts.js", jsContent);

      zip.generateAsync({ type: "blob" })
          .then(function(content) {
              saveAs(content, "MyProject.zip");
          });
  });