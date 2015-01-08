forum permissions:
user.permissions.forum:int
2:  user can answer posts and edit posts of himself
4:  user can create new threads
8:SMALL MODERATOR:  user can moderate posts of another users (edit and delete posts) and move threads
16: NOT USED
32: USER MODERATOR user can change forum permissions of another users(up to 31)
64: NOT USED
128:FORUMADMIN  forum admin (can create new sections and grant/revoke forum permissions(up to 127))

APPROVATION ENTITIES TYPES:
[0:forum_post,1:forum_thread,2:page_from_CMS]

unauthorized user cannot write posts and create threads
all clients(both authorized and unauthorized can send feedback to moderators)
each message can be edited by author in interval of 900 seconds(15 min.)

if user creates thread, this is marked as UNAPPROVED
if user wrote a post, this is marked as UNAPPROVED and thread also marked as UNAPPROVED

in table 'logs' must be displayed info about accessing management tabs by moderators and administrators
approving, deleting, editing and moving of posts and threads, also creating new sections must be logged in 'logs' table

table `actions`:
user_id
dt timestamp with time zone not null default now(),
action smallint, --code of action(for example, changing user permission, deleting post or moving of thread)
params json --here must be placed all available info for undo this action(in case of deleting of post, this is post_id,thread_id,author_id,post_content,post_attachments,post_date)

forum moderation
allowed for users with permissions masks &16 and &32
if user is moderator, then he can access moderation tabs in Control panel
I)  moderation tabs of SMALL MODERATOR:
  1. latest N posts, awaiting approval (N is set in `settings` table as "forum.admin.latestAwaitingApprovalPostsCount")
    by clicking on post, moderator can see detailed info and:
    a) delete post: post content will be replaced with label 'deleted by moderator'
    b) edit post: post content will be edited by moderator and after post content will be displayed label 'edited by moderator'
       if post has been edited by moderator, this will be automatically marked as approved
  2. latest N threads, awaiting approval (N is set in `settings` table as "forum.admin.latestAwaitingApprovalThreadsCount")
       in this tab must be displayed info about thread, all messages of this thread and button to approve thread or move thread to another section
    by clicking on thread, moderator can see detailed info and:
    a) close thread: since thread was closed, nobody can write posts, and will be displayed label 'closed by moderator'
    b) move thread: section_id will be changed, counters of posts and threads must be recalculated
       if thread has been moved or closed by moderator, this will be automatically marked as approved
       if user wrote post after approval, thread will be marked as UNAPPROVED
III)  moderation tabs of USER MODERATOR:
  2. find users by displayname (ajax)
    by clicking on user, moderator can see detailed info and:
    a) change ONLY forum permissions
      changing of permissions should be displayed immediately in session variables
IV)  forum dashboard:
  1. overall num of posts, sections, threads, users, and per day and in last day
  2. log of admin login actions since last day
  3. button to recalculate posts and threads count in sections
  4. number of active users(online) (will be used Redis for counting)
  5. log of actions of all admins since last day


some operations require appopriate user permissions. User without required permission mask cannot do this operation.




FORUM URL PATTERNS:
/ is root of application
  here are displayed all forum sections(titles, count of threads,count of posts)
/section_name displays paged list of threads in current section
  if section does not exists, 404 page will be displayed
/section_name/thread_id displays paged list of posts in current thread
  threads are fetched by thread_id!!!
  if section does not exists, or thread_id is wrong, 404 page will be displayed
    each unauthorized user can set in session variable order of displaying of messages in thread
    each authorized user can save in table `users`.options.forum_posts_order variable order of displaying of messages in thread
/fm-admin is base angularjs application of admin panel
  based on admin permissions, will be displayed different set of management tabs
  if user`s permissions are lower, as 8, will be send 404!
/user/user_id displays user`s public info and forum statistics(posts written,threads created,number of times thanked, etc.)
  if user with given id does not exists, will be displayed page 'user not found'




FORUM PAGES DESIGN AND FUNCTIONALITY:
2-languages (EN-RU)
must be Bootstrap2.0 compatible
must be carefully displayed on screens with different resolution
if user is logged in, username must be displayed and link to user`s notifications
if user is admin, /fm-admin link must be displayed
below must be placed form for feedback(in footer or as widget laterally)
minimum of css and jquery
every user`s action shall be responded to in the form of pop-up



this table will be used for approving of posts, threads and other materials created by users
CREATE TABLE approvals
(
  type         SMALLINT                 NOT NULL, --type is one of [0:forum_post,1:forum_thread,2:page_from_CMS]
  entity_id    INT                      NOT NULL, --id of post or thread or material
  who_approved INT                      NOT NULL REFERENCES users (id), --id of user who approved
  dt           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), --approvation date
  CONSTRAINT approvals_pkey PRIMARY KEY (type, entity_id)
);


each approving/disapproving must be logged to 'actions' table