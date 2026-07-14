module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: ".",
        message: [
          "uv pip install -r requirements-openvoice.txt",
          "uv pip install gradio"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        path: ".",
        message: [
          "git clone https://github.com/myshell-ai/OpenVoice.git",
          "cd OpenVoice && pip install -e .",
          "pip install git+https://github.com/myshell-ai/MeloTTS.git"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        path: ".",
        message: [
          "python -c \"from huggingface_hub import snapshot_download; snapshot_download(repo_id='myshell-ai/OpenVoiceV2', local_dir='checkpoints_v2')\""
        ],
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "."
        }
      }
    },
    {
      method: "input",
      params: {
        title: "Install Complete",
        description: "OpenVoice has been installed successfully."
      }
    },
  ]
}
