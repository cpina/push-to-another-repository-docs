.. _faq::

===
FAQ
===

-----------------------------------------------------------------------------------
How can I copy only some files / only some directories / exclude some files / etc.?
-----------------------------------------------------------------------------------

If you need to filter files or directories (exclude files, include only some, etc.) use a step before the Action to filter these into a temporary directory that will be pushed. This can be done with "rsync" or any tool that you feel comfortable with (could be "rclone" or "find + exec + rm", "find + exec + mv", etc. depending on your needs).

See a `working example`_ to exclude a generated file (*main.epub*).

.. code-block:: yaml
 :emphasize-lines: 7-8,15

 jobs:
   build:
     runs-on: ubuntu-latest
     container: pandoc/latex # just an example, adjust it
     steps:
       - uses: actions/checkout@v2
       - name: Copy output_temp/ to output/ using rsync (to exclude main.epub in this example)
         run:  apk add rsync && rsync -arv --exclude="/main.epub" output_temp/ output/
       - name: Pushes to another repository
         id: push_directory
         uses: cpina/github-action-push-to-another-repository@main
         env:
           SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
         with:
           source-directory: output/
           destination-github-username: 'cpina'
           destination-repository-name: 'push-to-another-repository-output'
           user-email: carles3@pina.cat
           target-branch: main


In the step above, ``rsync`` is installed (depending on your environment it will already be installed) and everything is copied from ``output_temp`` to ``output`` excluding ``main.epub``. Be careful with the usage of "/" and the exclude parameter in rsync directories. Refer to the rsync documentation for other options such as filter using an extension to include only some files / directories, etc. ``rsync`` filters are very flexible.

------------------------------------
How can I copy the whole repository?
------------------------------------

Use ``source_directory: .`` (and using no ``destination-directory`` or ``destination-directory: .`` to copy all the source GitHub repository to the destination.

.. warning::
  This will also copy ``.github/workflows/``! The destination repository will try to execute the Action. It will probably fail because the SSH keys / Personal Access Token will not be available for the destination repository.

An easy way to avoid the execution in the destination repository if you are using ``source_directory: .`` is to disable the GitHub Actions in the destination repository. To disable GitHub Actions in the destination repository:

 #. Go to the destination repository (e.g. https://github.com/cpina/push-to-another-repository-output/settings)
 #. Click on "Settings"
 #. On the left side bar click on "Actions" and then "General"
 #. Click on "Disable actions"
 #. Click on "Save"

.. _working example: https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/.github/workflows/ci.yml#L21