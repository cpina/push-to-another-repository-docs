.. _sphinx_example:

==============
Sphinx example
==============

-------------
Introduction
-------------

It is possible to use the ``github-action-push-to-another-repository`` to publish Sphinx documentation that is pushed into a GitHub repository, into GitHub Pages (for example, pushing the generated documentation into a branch of the same repository).

The documentation for this Action is published using the documented Action.

In the following example, the documentation is pushed into a repository and the same repository (different branch) is used to make the documentation available using GitHub Pages. This could also be done using a different repository.

-----
Steps
-----

Steps (may differ depending on your Sphinx setup, GitHub repositories setup, etc.):

 #. Write the documentation using `Sphinx`_
 #. Make sure that you can build the documentation using ``make html`` in a virtual environment
 #. Using the git command line or even the GitHub page for your repository (clicking on the branches), create a new branch, for example, ``gh-pages``
 #. In the settings for your repository, on the left-hand side click on ``Pages`` and then in ``Source``, select ``Deploy from a branch``. In Branch, select ``gh-pages`` (or the name that you chose for the branch) and select the folder ``/docs``

You also need to :ref:`setup the destination repository <setup>` to be able to push there.

-------------
Configuration
-------------

In the origin repository where the documentation source files (usually *.rst files) are pushed, create a file named ``.github/workflows/publish.yml``:

.. code-block:: yaml
 :linenos:

 name: build documentation and publish

 on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

 jobs:
   publish:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v2
       - uses: actions/setup-python@v4
         with:
           python-version: '3.9'
       - run: pip install -r requirements.txt
       - name: build documentation
         run: make html
       - run: touch _build/html/.nojekyll
       - uses: cpina/github-action-push-to-another-repository@main
         env:
           SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
         with:
           source-directory: '_build/html'
           destination-github-username: 'cpina'
           destination-repository-name: 'push-to-another-repository-docs'
           user-email: carles@pina.cat
           target-branch: gh-pages
           target-directory: docs


Relevant lines:

 - Checkout the origin repository (line 13)
 - Setup Python version 3.9 (lines 14-16)
 - Install the packages in your ``requirements.txt`` (contains Sphinx) (line 17)
 - Build the documentation (line 18-19)
 - Create the ``.nojekyll`` file to also publish the ``_static`` directory (`as documented`_) (line 20)
 - Follow the usual github-action-push-to-another-repository setup (lines 21-30). The ``destination-repository-name`` is the same in which the Action is executed, and the ``target-branch`` matches the one setup in the repository settings

.. _push-to-another-repository-docs repository: https://github.com/cpina/push-to-another-repository-docs
.. _.github/workflows/publish.yml:  https://github.com/cpina/push-to-another-repository-docs/blob/main/.github/workflows/publish.yml
.. _Sphinx: https://www.sphinx-doc.org/en/master/
.. _as documented: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/