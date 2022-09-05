Welcome to github-action-push-to-another-repository's documentation!
====================================================================

This GitHub Action will help to push files from one GitHub repository to another. For example, on a git push in a `source` repository, files can be pushed into a `destination` repository.

A couple of examples of this could be:

- Specifying a directory in a `source` repository to be pushed to a `destination` repository
- Generating some files using another GitHub Action and pushing them into another `destination` repository (e.g. generate PDFs from MarkDown and push the PDFs across to the `destination` repository)

Features:

- Authentication: using SSH deploy keys or GitHub Personal Access Token
- Support github.com server and also GitHub for Enterprise
- Specify in the configuration the source directory and destination directory and repository
- Change the commit message
- Documentation include example how to filter files or directories

.. toctree::
  :caption: Table of contents

  overview.rst
  usage.rst
  setup.rst
  troubleshooting.rst
  faq.rst
