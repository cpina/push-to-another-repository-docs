.. _troubleshooting::

===============
Troubleshooting
===============

-----------------------------------------
Cannot push to the destination repository
-----------------------------------------

This is the most common problem. Carefully read the logs on the GitHub Action pages of the source repositories. The action tries to write the errors and gives possible solutions / hints. To solve this problem, the first suggestion is to follow the steps above to redo the setup following the steps above. If this still does not work, the following problems have occurred in the past, so they may be useful points to start solving the problem:

 #. User was logged in to GitHub with an account that did not have permission to push into the destination repository. The action could not push (permission denied).

 #. Expired Token.

 #. SSH generated key pair (public/private) was set in the wrong way.

 #. Wrong copy-paste including spaces or other characters that did not belong to the key / token


Test connection to GitHub using the key pair
--------------------------------------------

The public key should have been added into the repository (as an SSH deploy key following the documentation above).

Then, do:

.. code-block:: console

  $ ssh -o IdentitiesOnly=yes -i .ssh/id_push-to-another-repository-output_ed25519 git@github.com

Instead of ``.ssh/id_push-to-another-repository-output_ed25519``, use the file as you created it. This is the **private** key (it does not end with `.pub`). If you used the correct private key for the correctly uploaded public key, it will print something along the lines of:

.. code-bock::

  Hi cpina! You've successfully authenticated, but GitHub does not provide shell access.
  Connection to github.com closed.

If you see:
.. code-block::

  git@github.com: Permission denied (publickey).

the public key for this private key is not available on GitHub.

Verify that the key is in the correct repository
------------------------------------------------

.. code-block:: console

  $ ssh-keygen -lf .ssh/id_push-to-another-repository-output_ed25519

The output will be something like:

.. code-block::

  256 SHA256:SOME_STRING_OF_CHARACTERS carles@pina.cat (ED25519)

This should match what you see in the deploy key of the destination repository. If it does not match, the deploy key is not properly set (perhaps different public/private keys were used, for example).

Verify the Permission of the key
--------------------------------

Visualise the key in the destination repository, and it should say:

.. code-block::

  Read/Write

Test the Personal Access Token
---------------------------------

If the Personal Access Token method was used for the setup, check it has the correct permissions to push to the destination repository and has not expired.

In your terminal do:

.. code-block:: console

  $ git clone https://YOUR_USERNAME:YOUR_ACCESS_TOKEN@github.com/SOMETHING/REPO
  # YOUR_ACCESS_TOKEN probably starts with ghp_
  $ cd REPO
  $ git checkout -b test
  $ git push origin test

For example, if the token did not have permission to write (because `repo` was not enabled for this token), you might see the following:


.. code-block: console

  $ git push origin test
  remote: Permission to cpina/qdacco.git denied to cpina.
  fatal: unable to access 'https://github.com/cpina/qdacco/': The requested URL returned error: 403

--------------------------------------------------
Error: URL using bad/illegal format or missing URL
--------------------------------------------------

It seems that GitHub created a Personal Access Token with a space character. This would happen if the Personal Token had a `#` or some other characters.

Firstly, check that no space was copied by mistake to the ``API_TOKEN_GITHUB``. If this was the case, do the correct the copy.

Secondly, if GitHub created a token with `#` or a space inside, I suggest creating a new one.

The problem, for those that are curious, is that the Personal Access Token is used in the git URLs and the URLs don't support `#`. The error ``URL using bad/illegal format`` comes from the curl library used by git.

More information: https://github.com/cpina/github-action-push-to-another-repository/issues/70

-----------------------------------
Error: remote: Repository not found
-----------------------------------

Bug report where the GitHub Action ended with:

.. code-block::

  remote: Repository not found.
  fatal: repository 'https://github.com/ORGNAME/REPONAME.git/' not found

See the possible solution in the comments of the https://github.com/cpina/github-action-push-to-another-repository/issues/75
