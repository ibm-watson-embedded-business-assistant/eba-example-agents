## Task management and delegation

We are pleased to announce a new capabilty to our system--task management and delegation. EBA will allow you to create, view, and manage a set of tasks for your daily business workflow. Additionally, you may delegate a task to another colleague within your organization. All of this is accomplished through natural dialog with your assistant. Furthermore, task management works in conjunction with our notification service. You can imagine logging into EBA at the start of your business day to find your assistant notifying you of a set of existing tasks; and, likewise, your assistant will be able to delegate pressing tasks to another colleagues in real time. 

[![Task management](../task-management.png "Task management")](../task-management.png)

You will notice the following natural langauge commands which allow you to manage your tasks:
 - show me my tasks (shows all tasks)
 - show me content of task <id> (shows data content associated with a task)
 - tell <name> <task> (assigns a task to valid user)

Furthermore, when we create a task, we package and migrate the data content associated with it between users. This allows us to ensure that the data in question is the same across multiple users varying context.

As an aside, we would like to remind users that the Notification agent, which implements tasks management, has been live since last year. In EBA you can set a conditional notification using a phrase “notify me if <some condition understandable by a skills set of agents loaded into your EBA assistant>.” For instance, consider the examples below:

- notify me if this product is on promotion
- notify me if an open rate of my recent mailings is below 15%
- notify me if an anomaly is detected in my supply chain

A word from the architect:
> Both notifications and tasks represent a unit of work – a live structured data with a sequence of actions and a set of allowed operations. Notifications justifies its operationality and ability to execute in autonomous mode. Task assignment and delegation justify its mobility and ability to execute in various contexts. Both notifications and tasks support continuity of conversation. These properties are vital for EBA and BPM worlds interconnect.

