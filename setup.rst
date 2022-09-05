.. _setup

=====
Setup
=====

Before using the GitHub Action, either the **SSH Keys (recommended)** or the **Personal Access Token** need to be set up as described below.

-------------------------------------------
``SSH_DEPLOY_KEY`` Vs. ``API_TOKEN_GITHUB``
-------------------------------------------

The Action, entirely executed in your GitHub continuous integration environment, needs to be able to push to the destination repository.

There are two options to do this:

- Create an SSH deploy key. This key is restricted to the destination repository only (recommended)
- Create a GitHub Personal Access Token. The Token has access to all your repositories

Someone with write access to your repository or this Action, could technically add code to leak the Token. Thus, **it is recommended to use the SSH deploy key method to minimise the impact** if this were to happen.

Initially, this Action only used the Personal Access Token method and it still supports both methods to keep backwards compatibility.

Setup using SSH deploy key
==========================

Recommended, but the setup has a few more steps compared with the Personal Access Token option.

Generate the key files
----------------------

  #. In your computer terminal, generate an SSH key using, in your terminal:

     .. code-block:: console

        ssh-keygen -t ed25519 -C "your_email@example.com"

     (the type of key ``ed25519`` is recommended by the `GitHub documentation`_.)

  #. ``ssh-keygen`` will ask for a file path: `Enter file in which to save the key`: please write a new file name. I suggest the default directory and as a filename: ``id_github_{name_of_your_destination_repository}`` to avoid overwriting a previous file. If you will be using this Action for multiple repositories, you might want to generate different keys for each one. For the repository https://github.com/cpina/push-to-another-repository-example/, ``id_github_push-to-another-repository-example`` could be used.

  #. Leave the passphrase empty (otherwise the GitHub Action cannot use it)

The steps above will have created two files: the private key (in the file ``id_github_{name_of_your_destination_repository}``) and the public key (``id_github_{name_of_your_destination_repository}.pub``).

Full example:

.. code-block:: console

   $ ssh-keygen -t ed25519 -C carles@pina.cat
   Generating public/private ed25519 key pair.
   Enter file in which to save the key (/home/carles/.ssh/id_ed25519): /home/carles/.ssh/id_ed255^C
   $ ssh-keygen -t ed25519 -C carles@pina.cat
   Generating public/private ed25519 key pair.
   Enter file in which to save the key (/home/carles/.ssh/id_ed25519): /home/carles/.ssh/id_github_push-to-another-repository
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   Your identification has been saved in /home/carles/.ssh/id_github_push-to-another-repository
   Your public key has been saved in /home/carles/.ssh/id_github_push-to-another-repository.pub
   The key fingerprint is:
   SHA256:qkWM49d0ecTh+d9/CoRIv/N05oYGYvu+wOreQH9PoQ4 carles@pina.cat
   The key's randomart image is:
   +--[ED25519 256]--+
   |            .    |
   |           o o   |
   |        .   =    |
   |     o . o + .   |
   |    o + S = + .  |
   |   . + *o..= . ..|
   |    . =.Eo=.+.o o|
   |     + +.= *o=. o|
   |    .o+ .o=oo.o.o|
   +----[SHA256]-----+
   $

The public and private SSH files:

.. code-block:: console

   $ ls -l /home/carles/.ssh/id_github_push-to-another-repository*
   -rw------- 1 carles carles 411 Jul 28 09:40 /home/carles/.ssh/id_github_push-to-another-repository
   -rw-r--r-- 1 carles carles  97 Jul 28 09:40 /home/carles/.ssh/id_github_push-to-another-repository.pub
   $

Add public key in the destination repository
--------------------------------------------

In this section, we will add the generated public key to the destination repository. This allows the Action to push there.

 #. Go to the GitHub page of the **destination** repository (e.g. https://github.com/cpina/push-to-another-repository-output)
 #. Click on "Settings" (settings for the repository, not the account settings)

    .. image:: screenshots/ssh-key-10.png
       :class: with-border

 #. On the left-hand side pane click on "Deploy keys"

    .. image:: screenshots/ssh-key-20.png
       :class: with-border

 #. Click on "Add deploy key"

   .. image:: screenshots/ssh-key-30.png
      :class: with-border

 #. Title: "GitHub Action push to another repository"
 #. Key: paste the contents of the file with the public key. This was generated in the "Generate the key files" step and the name is "id_github_name_of_your_repository.pub"
 #. **Enable** "Allow write access"

    .. image:: screenshots/ssh-key-40.png
       :class: with-border


.. _GitHub documentation: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key
