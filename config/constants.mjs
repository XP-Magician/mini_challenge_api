const CONFIG = {
  URI: process.env.PRODUCTION_URI ?? "http://localhost:54321/",
  USERNAME: "foris_challenge",
  PASSWORD: "ForisChallenge",
  NUMBER_OF_GROUPS: 168,
  CORRECT_ANSWER: 28,
};

export const TEXT = {
  INSTRUCTIONS: `instructions :Connect to '/challenge' using your access_token and follow the instructions in the response. Note that the access_token expires in one hour. Include it in the Authorization header in the format 'Bearer {access_token}'. For examples, refer to: https://swagger.io/docs/specification/authentication/bearer-authentication/.`,
  CHALLENGE: `Welcome to the Foris developer mini-challenge! Follow these steps to complete the task:

  1. **Download SQL Dump**
  
      To get PostgreSQL script make a GET request to the endpoint /dumps/onlinepsql and copy the script of the response.
     
  
  2. **Import Database**
  
      Head to https://sqliteonline.com/, click on PostgreSQL on the left sidebar, paste the dump contents, and run the script. You should see the created tables on the sidebar.
  
  3. **Inspect Database**
  
      Take a moment to examine the imported database to understand its structure, including the models and data it contains.
  
  4. **Query Database**
  
      Use an SQL query to find the answer to the following question: "How many students who enrolled in at least 5 groups between the start of February 5 and the end of February 7, enrolled in at least one subject with a code ending in '1'?"
  
     **Warning!** The value '2024-02-07' represents the start of February 7, not its end.
  
  5. **Validate your answer**
  
     You can validate your answer sending a 'POST' request to /validate.
     
     The body must have the following attributes:
     
     * 'NUMBER_OF_GROUPS': Is the number of groups present in the table 'group' of the given dump. By giving this you prove that you successfully inspect your database.
     
     * 'YOUR_ANSWER': Is the answer of the question asked in the previous step.
     
     This query can be executed only once per hour, so be careful when you send the request.
  
  6. **Submit Your Answer**
  
      When you are done, submit your answer in the questionnaire provided when submitting your application via Getonboard.
  
  That's it! Good luck with the challenge.`,
  POSTGRESCRIPT: `
  CREATE TABLE public.student (
    id uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY (id)
  );
  
  CREATE TABLE public.subject (
    id uuid NOT NULL,
    code varchar(63) NOT NULL,
    "name" varchar(255) NOT NULL,
    CONSTRAINT subject_pkey PRIMARY KEY (id)
  );
  
  CREATE TABLE public."group" (
    id uuid NOT NULL,
    code varchar(63) NOT NULL,
    subject_id uuid NOT NULL,
    CONSTRAINT group_pkey PRIMARY KEY (id),
    CONSTRAINT group_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id)
  );
  
  CREATE TABLE public.enrollment (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    student_id uuid NOT NULL,
    enrollment_hour timestamp NOT NULL,
    CONSTRAINT enrollment_pkey PRIMARY KEY (id),
    CONSTRAINT enrollment_group_id_fkey FOREIGN KEY (group_id) REFERENCES public."group"(id),
    CONSTRAINT enrollment_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id)
  );
  
  INSERT INTO public.student (id,"name") VALUES
     ('4a22d805-5f3f-4139-b57f-dc2750192d99','Danielle Adams'),
     ('c370532e-dcd9-4ad5-863d-c26be43dde22','Nancy Kim'),
     ('73ca1e2a-2fa2-457b-980f-cee8ffc9229c','Scott Smith'),
     ('426a35c6-a300-45ad-af12-abc7cb00953b','Haley Gomez'),
     ('2e3b0bd4-619f-4399-af0a-d9d9cdbd2669','Gary Atkinson'),
     ('e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','Scott Johnson'),
     ('e4387b6f-6a03-4804-9a03-b372a50b0b88','Mrs. Karen Johnson'),
     ('37569f54-bb00-4ddb-8131-7fea52fbf68f','Erin Joyce'),
     ('55b3eeda-a410-441e-bc85-c183ba5ebe3a','Carlos Fisher'),
     ('c1beae9f-e757-4810-bfb3-ece9ec708921','Benjamin Taylor');
  INSERT INTO public.student (id,"name") VALUES
     ('3f0b69cf-67ed-471a-9c00-a177cbb43009','Christina Michael'),
     ('01348dfb-b923-4e4a-af85-6d3e640f435e','Richard Stein'),
     ('ae04681c-6e33-4cb7-8e4c-9888b4fa8ed5','Brian Baker'),
     ('d5c7ad00-9f38-4859-872c-d0f881dc7d42','Edward Hutchinson'),
     ('f4bf56b7-a0cf-49ef-9b03-9935b3186d77','Jane Barajas'),
     ('89454a47-1d72-497f-a65a-3fee12e9c88a','Lisa Rivera'),
     ('0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','Katherine Thompson'),
     ('ee12053e-b572-43db-9a9a-939106b5570f','Dwayne Parker'),
     ('826e21cc-b5dd-4695-a4d2-e407c595559e','Kathy Montes'),
     ('3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','Collin Morris');
  INSERT INTO public.student (id,"name") VALUES
     ('c3fc0c0a-0574-4ebf-b5fe-91853e4d5cb2','Hannah Buchanan'),
     ('573d024a-379e-4798-937c-bcad895a0aae','Mrs. Amy Mccarthy DDS'),
     ('1df3cc00-a460-4d6c-83b2-5be397a9de90','Yesenia Blackburn'),
     ('2a33da47-17a3-42f4-9a30-fcf046fc73b5','Walter Brown'),
     ('600779ea-c92f-4dfa-98d8-1e6ce6cc2080','Wesley Weber'),
     ('ac12171f-898a-4afe-b4d6-99759538ee6f','Craig Jenkins MD'),
     ('c1216115-6598-4cab-b72a-d8bcac0ffcab','Paul Lawrence'),
     ('64143ed9-100c-4ef6-a657-470dbc635dff','Elizabeth Morgan'),
     ('98849293-e6c1-4c82-96ce-f60f71603a21','Mark Gray'),
     ('d5a32784-dcc2-427e-96a4-2827aa9cdf02','Betty Soto');
  INSERT INTO public.student (id,"name") VALUES
     ('d1eb1762-109a-46c2-823a-076eeeb3bfd7','Amanda Crosby'),
     ('39d91eb0-2525-44a0-964e-6fa2ab0ec624','Jay Phillips'),
     ('163ac53c-b053-43f8-ad16-50b28a3d398f','Shawn Hull'),
     ('ec57f933-33e2-4388-a122-d1a355af628e','Curtis Hale MD'),
     ('b9523b86-89f0-4eeb-8d94-6988d9504cb9','Jon Diaz'),
     ('1a892ea0-c137-493c-bb7e-7682c50b9c9a','David White'),
     ('378517fe-bbfa-4cac-b483-28df5aef9f15','Beth Trujillo'),
     ('d921439f-9ab8-423f-9a35-5b3ddbf8ec70','Dawn Medina'),
     ('f3bcf608-9c70-46ad-8525-85fb98767903','Sarah Hansen'),
     ('cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','Dwayne Mcdonald');
  INSERT INTO public.student (id,"name") VALUES
     ('d7557d43-e1d8-4243-aa9c-e667a72f5e63','Peter Williams'),
     ('153fd38e-b9fd-4931-a7f9-b8fbb640ae62','Scott Peterson'),
     ('c42698b1-83b1-4073-b0ec-920abc8e724a','Alexander Reid'),
     ('914c9778-8085-411f-bac3-2a07ce314ac4','Cheryl Adkins'),
     ('3a12a073-03fa-40c5-ae63-033678ea9957','Stacy Fowler'),
     ('ac64edc8-1d64-4f3c-bebc-0f43f117a36d','Karen Suarez'),
     ('944ea541-c6b7-49da-8c0f-db6aad99fa08','Jacob King'),
     ('6715d2ca-8feb-4da9-98d8-fbf623baf61e','Tammy Schaefer'),
     ('73948a9b-6ccc-4e29-a9e8-a28025b22518','Brooke Olsen'),
     ('480047b2-083e-4e9d-bf62-b818a08ea580','Suzanne Scott');
  INSERT INTO public.student (id,"name") VALUES
     ('ec08250d-1710-4a12-a53d-140800047d5d','Ronald Humphrey'),
     ('c3b47f06-f407-4111-b207-a3492eba1fd1','Donald Wilson'),
     ('3e89da98-5792-43fe-b944-63356546d4b9','Ashley Smith'),
     ('b852c841-4b12-47a7-85c0-29a48d54a49f','Christina Sampson'),
     ('86cecfe3-207b-4c85-8adb-c0acdcbedd7c','Gregory Mccarty'),
     ('8a7a1504-0189-4775-a23b-9fa0d7d83468','Deborah Caldwell'),
     ('93634841-3be1-496f-af5b-48b7c53b2482','Lance Nichols'),
     ('f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','Michelle Zhang'),
     ('1f75bb82-c177-444b-9ddc-97eaa9727568','Tiffany Sandoval'),
     ('14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','Laurie Walker');
  INSERT INTO public.student (id,"name") VALUES
     ('b4344ebf-cc44-4caa-a6d9-97a15b7b737f','Robert King'),
     ('3f255aad-dd56-4d1a-ac01-98d7d5be17f4','Timothy Kelly'),
     ('faa2925b-be91-4bd4-ab4e-f5a920009081','Rachel Allen'),
     ('6b02251c-06e9-4721-93b6-51bb086ed053','William Thomas'),
     ('162cc34d-527a-48ed-ba8a-10102d1fd092','Phillip Murphy'),
     ('437fecbe-5492-45b2-aa67-0fff0a3ba885','William Perez'),
     ('07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','Crystal Robinson'),
     ('ae156d32-7897-4b01-957a-051d844fc037','William Hart'),
     ('e0f1b5f7-0240-4ea1-ba80-01c976bab478','Dr. Zachary Maxwell'),
     ('9d0e3413-cc9a-483f-910c-9c7b8eb9b192','Stefanie Stephens');
  INSERT INTO public.student (id,"name") VALUES
     ('677ec247-0202-4a25-881c-ae83aeb50d30','Lisa Peters'),
     ('917ac8dc-35bb-4f7a-aa33-268ceb69e969','Joseph Blanchard'),
     ('0f795b3f-d591-4938-bc5e-7ad622ef5ad4','Kristi Key'),
     ('25e9b1cb-73cb-4e99-bdaa-44dfbfc74425','Megan Short'),
     ('f7b78a24-17b3-4cef-8a4c-7adf76483ec4','David Barrera'),
     ('508901e1-0b37-4460-bf35-626e13194c2d','Donna Willis'),
     ('b9ed249a-9403-46fb-bd51-3b00805fbb1c','Paul Martinez'),
     ('5063c72e-4ea1-4af2-ab70-8986a3e6e554','Danielle Porter'),
     ('c8abeece-239e-4595-a82f-9e483a7698b3','Angela Barr'),
     ('19fe04db-6226-4784-bdd5-f75a438ee4a9','Tyrone Pacheco');
  INSERT INTO public.student (id,"name") VALUES
     ('22240407-a33d-4504-9e9d-485f5de7215f','Isabel Howard'),
     ('a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','Thomas Hart'),
     ('80ead4d6-3418-4d31-81f6-7a5ea4f10da9','Jesse Garcia'),
     ('c66f3574-a71d-49b9-84af-525b3344088d','Kristin Collins'),
     ('e19bed36-3ba0-4ed7-9929-0a72a15eac05','Cesar Tyler'),
     ('56792bb3-72f2-4682-be67-c385f1928232','Andrea Clark'),
     ('eda17f88-54d5-4584-9b63-4e92efe1633e','Lisa Lopez'),
     ('fadb6e40-5127-4546-bc1c-0e1b43553360','Meghan Carey'),
     ('ee640787-ac7c-4c9c-a3a2-701cc9478ff5','David Young'),
     ('df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','Elijah Thomas');
  INSERT INTO public.student (id,"name") VALUES
     ('c9cca741-0854-434c-8ba0-ac51ec012e26','Paige Smith'),
     ('3fc128ca-ada1-435a-8fbd-d8071c6a8f84','Kathryn Clark'),
     ('7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','Alexis Deleon'),
     ('f2b71af2-f197-4c81-837b-0ba1f2d02422','Michael Davis'),
     ('9c3646ad-3808-4416-b106-be44ae6b0ed9','Teresa Jones'),
     ('b629320f-11cf-4134-96ed-6fb0bd604efc','Cynthia Mccormick'),
     ('40d13d1d-54d9-4f9c-9c8a-a8389d4cd3d6','Bryce Barnett'),
     ('b4bc5e5d-b047-4163-85b2-04035d554c5b','Kelsey Hunt'),
     ('50094b7a-69aa-465e-896f-65bcf654a881','Stephanie Williams'),
     ('e4dbceb3-142e-430f-8d97-228392a05697','Patrick Brooks');
  INSERT INTO public.student (id,"name") VALUES
     ('194ea130-b85a-4b2d-9814-8964814bb5ae','Timothy Thomas'),
     ('99e7df23-2177-443b-af22-3f346acf60fb','Tiffany Ford'),
     ('4922d5cc-bae2-4bca-85e8-20045b3eb0ee','Nicole Vaughn'),
     ('5efa6081-31e9-4716-a470-619139487ef3','Dennis Romero'),
     ('10452e30-2901-4316-918e-6ccb15948b46','Cory Lawson'),
     ('80988314-062c-4e3b-bb34-fc09a505798d','Hannah Banks'),
     ('2574828d-8de2-4981-b10d-5f071f0b17d3','Madeline Fisher'),
     ('03b07816-e733-4233-9b8f-a9dc000938d5','Ariana Lopez'),
     ('267496b0-1b6b-4021-94bf-0322de9743b4','Patrick Johnson'),
     ('97c6961c-1013-461f-a127-8776038455c2','Michael Chavez');
  INSERT INTO public.student (id,"name") VALUES
     ('d1abe84d-7d8f-4d0a-98c7-f22d808d3d47','Phillip Ruiz'),
     ('1da62425-930d-4afd-8494-3801493bf922','James Thompson'),
     ('4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','Joseph Benjamin'),
     ('826e6d9e-8eae-452a-82a8-26e26d62a048','Sierra Taylor'),
     ('71c8cefd-ee9f-4b33-9b2e-88d595014638','Dr. Christy Morgan'),
     ('d66954a3-7142-4b7d-8315-bb572ab33c15','Nathan Holland'),
     ('31966e82-00e4-4e17-8857-3284a0cb0764','Amy Martinez'),
     ('177f9734-b34a-4d23-a819-e4f1f895d7c7','Jeffrey Hahn'),
     ('94f7bb74-d510-49e0-a67e-38ba5ad0117f','Joshua Washington'),
     ('7b27d021-592c-412e-8140-88fa5ef8639c','Molly Mckenzie');
  INSERT INTO public.student (id,"name") VALUES
     ('3427ae3f-5344-4bec-8101-d663b5e7c32c','Jose Skinner'),
     ('b94822df-63ac-41c1-a51e-ccd93961ee07','Jennifer Greer'),
     ('e57110b1-d96a-414e-8ad8-498deda75c63','Dr. Kevin Salazar'),
     ('358a1887-24b4-48f8-9324-b494244e4d10','Andrew Morris'),
     ('efd51625-6133-4b27-ba93-af69e4a7f1ca','Gregory Park'),
     ('0148dc4c-519f-457d-b3c6-f936471dad95','Carrie Washington'),
     ('8da5528c-7ec3-4774-b048-f25d9e9ba13c','Jordan Smith'),
     ('eec1dcf5-df27-42d1-86b2-95f13d40bc38','Riley Nash'),
     ('eb4d7fb5-e886-444f-a0b5-0c4011c8852c','Kimberly Malone'),
     ('c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','Robert Cunningham');
  INSERT INTO public.student (id,"name") VALUES
     ('e8db3939-05a7-4027-a665-b351a38b6dae','Ashley Robinson'),
     ('47ed7896-97ad-4f5e-861d-354d364b13fe','Kimberly Shields'),
     ('6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','Alexander Carroll'),
     ('63c5d88b-0614-41b8-b030-b30fca61f8d5','Kimberly Goodwin'),
     ('fe9a1895-af13-4a9e-a017-9e59bf7d4758','Kevin Montoya'),
     ('6d386860-80dc-4892-a6bf-9a59ab0c0324','Richard Fisher'),
     ('4cf8790b-8459-4abe-9a8f-f066e422c791','Joy Kelley'),
     ('a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','Amanda Collins'),
     ('d58c5f59-1899-4d40-9393-94c9516f17cc','Elizabeth Robinson'),
     ('9390a16c-e3dd-4408-ab32-eacc17d32145','Erin Hahn');
  INSERT INTO public.student (id,"name") VALUES
     ('9df98f5b-a811-4653-ae16-40cce57478c9','Diana Mitchell'),
     ('16f3d502-51ac-4622-85cc-e0d558f14039','Robert Moses'),
     ('4959e3ae-9e37-432e-90cc-1ae1f50a00f1','Ryan Costa'),
     ('ea44bfd7-0a70-47f4-a9dd-1bc4cee4d3f1','William Jacobs'),
     ('56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','Heather Hammond'),
     ('c09ab23b-941e-4598-aef8-842037b9fe8e','Lawrence Hicks'),
     ('8afd9a3e-25d9-4c88-a4b6-ef290593d80b','Nathaniel Hodges'),
     ('1a295ec0-83aa-4604-a39b-7f0144902f78','Jackie Parks'),
     ('15cc3485-0284-4ad4-bc82-b4944fa5283d','Tanner Savage'),
     ('62d483f7-6734-40b9-8bc8-f09206cf08fb','Audrey Robertson');
  INSERT INTO public.student (id,"name") VALUES
     ('4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','Jennifer Ramsey'),
     ('99768113-2728-48be-88d4-3b9633a473cf','Debra Norton'),
     ('9fdf6d8e-1c10-4085-9777-20e1e3d5301a','Victoria Moore'),
     ('6f056ac5-6321-4810-93fa-36be3489c929','Grace Russo'),
     ('f36c140f-6926-4220-bc6a-12a76c7a30a0','Brent Guzman'),
     ('a34f3434-52d1-4163-b83b-31b3729b7bd3','Sandra Duran'),
     ('8b41b293-95de-4873-bbea-c3620ddfe791','Benjamin Hunter'),
     ('f30b59ba-fe41-43c7-b7fa-6ab7e930c642','Mary Petersen'),
     ('ac94e43d-d950-4056-8008-5ae23542ec81','Amber Trevino'),
     ('5963c980-fa39-486a-b585-a85bef3f0a1d','Robert White');
  INSERT INTO public.student (id,"name") VALUES
     ('0fb37c67-8380-482e-ac8a-7a906900ffd7','Allen Peterson'),
     ('9480c006-86e0-4f55-8ed4-2a1b93145935','John Gates'),
     ('e949f4d8-8eb2-4602-ad60-0180eb595d5a','Mary Lewis'),
     ('8ce1d084-5663-4ca7-9005-411812e8242e','Joseph Willis'),
     ('49c988de-d5d1-4b5e-990f-634e3c982824','Nathaniel Guerrero'),
     ('ff50d478-955e-4dfd-a10e-d1d978cebfb1','Jesse Jones'),
     ('82b47b79-de3e-4423-a2fe-3ab261062f7c','David Allen'),
     ('58688efd-d0ff-497e-b615-3de2886540fd','Daniel Hale'),
     ('52351f05-50ee-488c-8515-31549f08724d','Andrea Moore'),
     ('37513fa6-dc6f-4c2d-9238-f184a00df18e','Colleen Glass');
  INSERT INTO public.student (id,"name") VALUES
     ('83bb59f0-c9bf-48f5-90bd-5535aea8af46','Jason Byrd'),
     ('f248553c-8db2-4fc9-b0f4-91dc878fb2ab','David Hall'),
     ('4c395bdf-17d0-44c3-807d-ec8d84530326','Mrs. Elizabeth Edwards'),
     ('440a0f8c-1c4b-4fc8-b1e5-1277e8ae8ca1','Justin Morris'),
     ('aeffa91f-8e69-4caa-8adb-715afc8c4b46','Andrea Jarvis'),
     ('2cf440a6-4551-4f01-860c-4461f3476429','Patricia Cooper'),
     ('3d2d1cc0-d614-491c-b972-51393682fbc7','Noah Randall'),
     ('706bf9f2-602b-4321-bcde-13b0a5483397','Spencer Gilbert'),
     ('556b381a-db3e-4592-b436-d94646b028d1','Richard Salinas'),
     ('ffb1b27b-8902-4f9f-827b-ca82ce57232a','Sarah Wood');
  INSERT INTO public.student (id,"name") VALUES
     ('7fa6d33c-3a46-4851-9514-dd920c996d88','Mr. Vincent Hansen'),
     ('22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','William Jones'),
     ('9743d7eb-818d-46d6-a1fc-7ab428358e18','Lynn Moore'),
     ('1844d3d6-972f-408d-9de4-4451367edb65','Megan Smith'),
     ('21c48532-23fd-4a53-b860-91bcbcf9acbd','James Khan'),
     ('fda80abd-cf84-4f30-b5e1-bd4f0074d765','Sean Reed'),
     ('b5b5e2df-8dd2-491a-9924-8117aba37dbe','Eric Brandt'),
     ('16b85a6d-13c2-4e75-827c-9f8f04ca3c45','Jessica Baker'),
     ('cd4cbdf5-d94b-4389-bdfa-570a7f3662cc','Tracey Kirk'),
     ('7403c507-9296-4fe2-91dd-f158ef43e22c','Renee Shields');
  INSERT INTO public.student (id,"name") VALUES
     ('a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','Madison Meyer'),
     ('91b39f90-6936-4f30-a482-5fc317708fc1','Anthony Collins'),
     ('a89d954f-0245-4db1-ac65-60d9bc18fc0b','Jaime Cooper DVM'),
     ('ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','Collin Rodriguez'),
     ('a5470cb2-3293-48ca-9513-b095ff05b0aa','Michael Rios'),
     ('19bdaf5b-be11-46af-b0b0-494dc04993be','Jessica Johnson'),
     ('3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','Karen Mason'),
     ('1c800390-acf2-4d07-a2bb-12af13d5db68','Joel Fischer'),
     ('08b3806a-6982-4e83-8b50-ab66a21e30aa','Richard Kramer'),
     ('44a54fc4-1b5d-4940-a93b-6d72b0843477','Ryan Taylor');
  
  INSERT INTO public.subject (id,code,"name") VALUES
     ('4eef358e-d646-4459-851c-37ce47b6cdb7','MAT0001','Calculus 1'),
     ('6228764c-415b-4e1c-a8e5-903857188587','MAT0002','Calculus 2'),
     ('04898b60-1756-4830-bd2d-b86f3a4dc900','MAT0003','Calculus 3'),
     ('50e54766-0a1d-4c99-842a-e39e6801efae','MAT0004','Calculus 4'),
     ('760a9026-c3f5-46b2-a907-96cf8d01aa3e','MAT0005','Calculus 5'),
     ('ccb8d36e-8817-4548-8cf1-9479f1c1be72','MAT0006','Calculus 6'),
     ('0a66519b-c165-4ae8-8e82-82a4dc93ed4c','MAT0007','Calculus 7'),
     ('b5c5d0c0-3751-4ffc-b2c9-7a6e0ffff1a6','PHI0001','Philosophy 1'),
     ('7a0e6ce8-77e7-4aa4-a89e-82499ac57d78','PHI0002','Philosophy 2'),
     ('ec01cba8-5a1e-4034-a4e4-b5d2ee9ed2ac','PHI0003','Philosophy 3');
  INSERT INTO public.subject (id,code,"name") VALUES
     ('c1d1d5f3-b4c8-4c6f-8701-d0e2d61615fc','PHI0004','Philosophy 4'),
     ('e98bd995-3e38-486d-ba3c-a9b3ab450db2','PHI0005','Philosophy 5'),
     ('0872b84e-cd61-43ed-b1b5-e954f80e1736','PHI0006','Philosophy 6'),
     ('6a7c8700-3dd0-46f0-b6de-79cdf79a04ef','PHI0007','Philosophy 7'),
     ('a4a43146-c34e-4740-b316-ed14313a255d','PHY0001','Physics 1'),
     ('8e45bccd-9222-4d0f-a5df-3e9a7bd6f74c','PHY0002','Physics 2'),
     ('2eb853c7-9195-42d3-afee-f6c079f45d8e','PHY0003','Physics 3'),
     ('90d680fb-07a8-4661-b2c6-24a765f477e0','PHY0004','Physics 4'),
     ('91e6a911-24b1-46b6-8ab5-1343264b4c25','PHY0005','Physics 5'),
     ('43a69402-7f7b-46e1-bb5a-92e74c858b7a','PHY0006','Physics 6');
  INSERT INTO public.subject (id,code,"name") VALUES
     ('c35c20ce-3fe9-447f-954f-a3f62034f2e9','PHY0007','Physics 7'),
     ('0eb27482-00c3-4be1-9aab-a28ef7d9de36','CHE0001','Chemistry 1'),
     ('71fdd915-e2bd-4468-b899-11bf508d6f57','CHE0002','Chemistry 2'),
     ('22afbdcb-74a3-4c56-99bc-20150e1c43bb','CHE0003','Chemistry 3'),
     ('1727b2c6-0ba1-4238-a193-9067a7bb0495','CHE0004','Chemistry 4'),
     ('68c68952-a6e1-4cd5-b69a-dd6c6f82dd80','CHE0005','Chemistry 5'),
     ('ae1ff02c-366a-419b-8198-21976ebee68a','CHE0006','Chemistry 6'),
     ('67a2f9f7-0514-40c9-bc8a-c82c634b0e9e','CHE0007','Chemistry 7'),
     ('e53af27b-c645-4dc1-9267-f2fe9c9f0d38','LIT0001','Literature 1'),
     ('c36a6993-6f36-4e56-b40c-1246773900c5','LIT0002','Literature 2');
  INSERT INTO public.subject (id,code,"name") VALUES
     ('5ef93c84-91de-4207-8772-4b8b5b234f08','LIT0003','Literature 3'),
     ('4ca3df67-99da-4784-b7d9-8456053ab647','LIT0004','Literature 4'),
     ('b3632e3d-2b82-44c8-8766-863c81990c79','LIT0005','Literature 5'),
     ('2ed380d8-799b-4c24-8c13-3a9828bb478d','LIT0006','Literature 6'),
     ('13c594b2-68f7-44eb-80c1-32bb33ac088b','LIT0007','Literature 7'),
     ('5fcae8fc-1022-46d2-a7cc-17f436753d96','SPO0001','Sport 1'),
     ('b8401d53-c097-4cf2-9e99-58bde3b1bc85','SPO0002','Sport 2'),
     ('7850c256-18a0-41d9-a887-39cd856a1441','SPO0003','Sport 3'),
     ('44abb021-882c-457e-98b4-6112bb8f8dc9','SPO0004','Sport 4'),
     ('7ecbef91-b7d9-4708-9b62-6f1aa7d34ece','SPO0005','Sport 5');
  INSERT INTO public.subject (id,code,"name") VALUES
     ('c40cc5cc-5025-47b5-aded-b08de2a495ce','SPO0006','Sport 6'),
     ('9e464c14-a4de-4dbe-b372-13853a4490c3','SPO0007','Sport 7');
  
  
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('18883ccb-71e0-4af7-ae0f-4be8a69472c1','MAT0001 1','4eef358e-d646-4459-851c-37ce47b6cdb7'),
     ('944c1df7-83fc-4e02-acfa-a051247ccb7b','MAT0001 2','4eef358e-d646-4459-851c-37ce47b6cdb7'),
     ('2b8b6da1-7f3a-48f8-ae0e-e2f77b4d2179','MAT0001 3','4eef358e-d646-4459-851c-37ce47b6cdb7'),
     ('8539137f-49e3-43a9-8340-806146c7f27a','MAT0001 4','4eef358e-d646-4459-851c-37ce47b6cdb7'),
     ('8c7e578b-4918-4e36-91d0-d77edd73a470','MAT0002 1','6228764c-415b-4e1c-a8e5-903857188587'),
     ('76fed48b-5c6b-4e36-b58c-300918f2fc7f','MAT0002 2','6228764c-415b-4e1c-a8e5-903857188587'),
     ('54ef1506-540c-4567-afb9-406ae9d95e34','MAT0002 3','6228764c-415b-4e1c-a8e5-903857188587'),
     ('783a5a8a-d439-487d-a190-6a2fc5903553','MAT0002 4','6228764c-415b-4e1c-a8e5-903857188587'),
     ('c8c4650c-71c8-46ef-b813-f09e063dbc99','MAT0003 1','04898b60-1756-4830-bd2d-b86f3a4dc900'),
     ('77f1be48-5c6b-44f8-ac52-7a760c7faf9c','MAT0003 2','04898b60-1756-4830-bd2d-b86f3a4dc900');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('ac38f34b-99d1-4a4d-acb8-738b299fb79c','MAT0003 3','04898b60-1756-4830-bd2d-b86f3a4dc900'),
     ('16e56781-09b6-4271-9fac-ade178214849','MAT0003 4','04898b60-1756-4830-bd2d-b86f3a4dc900'),
     ('386e6f19-ff6e-48be-954e-f9dfa51b5b80','MAT0004 1','50e54766-0a1d-4c99-842a-e39e6801efae'),
     ('9d40faa9-3695-43d6-a19c-4dc329edb8f4','MAT0004 2','50e54766-0a1d-4c99-842a-e39e6801efae'),
     ('80f0d83a-2e2d-46c0-a2cf-e90950b22d15','MAT0004 3','50e54766-0a1d-4c99-842a-e39e6801efae'),
     ('b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','MAT0004 4','50e54766-0a1d-4c99-842a-e39e6801efae'),
     ('934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','MAT0005 1','760a9026-c3f5-46b2-a907-96cf8d01aa3e'),
     ('2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','MAT0005 2','760a9026-c3f5-46b2-a907-96cf8d01aa3e'),
     ('ce1f6aba-e753-4693-905a-9c2efd7580bd','MAT0005 3','760a9026-c3f5-46b2-a907-96cf8d01aa3e'),
     ('a162d19b-bd43-4e3a-b989-fbc37b0d2b83','MAT0005 4','760a9026-c3f5-46b2-a907-96cf8d01aa3e');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','MAT0006 1','ccb8d36e-8817-4548-8cf1-9479f1c1be72'),
     ('73b5e884-070d-4c2a-b272-08c8fd05e44f','MAT0006 2','ccb8d36e-8817-4548-8cf1-9479f1c1be72'),
     ('fa027eba-8479-4063-a726-a70bbaae49bf','MAT0006 3','ccb8d36e-8817-4548-8cf1-9479f1c1be72'),
     ('4ba65332-3c44-4143-a34b-253073c73578','MAT0006 4','ccb8d36e-8817-4548-8cf1-9479f1c1be72'),
     ('560191fc-18f7-4962-ae5e-f3f1df01bd02','MAT0007 1','0a66519b-c165-4ae8-8e82-82a4dc93ed4c'),
     ('bc51b96f-6f70-48b2-8b9c-307cbf3caa16','MAT0007 2','0a66519b-c165-4ae8-8e82-82a4dc93ed4c'),
     ('4b4ef214-37e5-4968-af8a-983ed8836f3d','MAT0007 3','0a66519b-c165-4ae8-8e82-82a4dc93ed4c'),
     ('b9ba13f8-222f-4786-8c27-c237b134cc55','MAT0007 4','0a66519b-c165-4ae8-8e82-82a4dc93ed4c'),
     ('62b2f8bd-de13-47d5-ae67-405e5305ead2','PHI0001 1','b5c5d0c0-3751-4ffc-b2c9-7a6e0ffff1a6'),
     ('9da16b40-3a80-43ed-9ba5-dae08b4dc83f','PHI0001 2','b5c5d0c0-3751-4ffc-b2c9-7a6e0ffff1a6');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('b8322e1b-079a-44de-ad59-4978b2fd4dcc','PHI0001 3','b5c5d0c0-3751-4ffc-b2c9-7a6e0ffff1a6'),
     ('bea0dc91-7503-47d3-83fb-55a08fc31ead','PHI0001 4','b5c5d0c0-3751-4ffc-b2c9-7a6e0ffff1a6'),
     ('72209775-0fa0-422a-91ca-8f141731508e','PHI0002 1','7a0e6ce8-77e7-4aa4-a89e-82499ac57d78'),
     ('8e1699ec-8969-409e-ae00-fe9d697edebb','PHI0002 2','7a0e6ce8-77e7-4aa4-a89e-82499ac57d78'),
     ('dedf0663-486e-489b-abba-22c8106ff1a6','PHI0002 3','7a0e6ce8-77e7-4aa4-a89e-82499ac57d78'),
     ('72a4f385-4733-447c-9900-7cf624110fde','PHI0002 4','7a0e6ce8-77e7-4aa4-a89e-82499ac57d78'),
     ('f39ebe32-2918-4fb2-ac3f-3352f7601f4a','PHI0003 1','ec01cba8-5a1e-4034-a4e4-b5d2ee9ed2ac'),
     ('bbfdda21-be2b-4fb4-b02c-b9de5902dd39','PHI0003 2','ec01cba8-5a1e-4034-a4e4-b5d2ee9ed2ac'),
     ('bf4fa5eb-4819-4034-b5b8-d172cb1c7b8c','PHI0003 3','ec01cba8-5a1e-4034-a4e4-b5d2ee9ed2ac'),
     ('bd7f32f4-590c-4d1d-ac70-8bb04f481329','PHI0003 4','ec01cba8-5a1e-4034-a4e4-b5d2ee9ed2ac');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('7c749acd-4feb-4a93-8339-13d9d3c42196','PHI0004 1','c1d1d5f3-b4c8-4c6f-8701-d0e2d61615fc'),
     ('b9808c9a-d25b-422a-ad77-8b270e3c46c1','PHI0004 2','c1d1d5f3-b4c8-4c6f-8701-d0e2d61615fc'),
     ('0bc91ddb-22b0-4e77-928b-2ebfe438e7f0','PHI0004 3','c1d1d5f3-b4c8-4c6f-8701-d0e2d61615fc'),
     ('33631b9f-0169-4cae-8403-93aa80127cbc','PHI0004 4','c1d1d5f3-b4c8-4c6f-8701-d0e2d61615fc'),
     ('b699576a-07af-4fd6-bcc5-6c912630c3a6','PHI0005 1','e98bd995-3e38-486d-ba3c-a9b3ab450db2'),
     ('1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','PHI0005 2','e98bd995-3e38-486d-ba3c-a9b3ab450db2'),
     ('840d0b10-cce9-43d4-b57e-d381193335eb','PHI0005 3','e98bd995-3e38-486d-ba3c-a9b3ab450db2'),
     ('3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','PHI0005 4','e98bd995-3e38-486d-ba3c-a9b3ab450db2'),
     ('16e9371d-0c20-47cd-b28a-0f9f34971dde','PHI0006 1','0872b84e-cd61-43ed-b1b5-e954f80e1736'),
     ('40986a1a-9949-43af-833f-8e3f007b1bfa','PHI0006 2','0872b84e-cd61-43ed-b1b5-e954f80e1736');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('4fa7b45c-d365-4d3a-86ad-9f18573a5512','PHI0006 3','0872b84e-cd61-43ed-b1b5-e954f80e1736'),
     ('eed01dfb-2bd1-42fe-8b9f-96666b0e5889','PHI0006 4','0872b84e-cd61-43ed-b1b5-e954f80e1736'),
     ('b12f9b56-0e18-4e37-b92b-79af1ec384bb','PHI0007 1','6a7c8700-3dd0-46f0-b6de-79cdf79a04ef'),
     ('4c70dbd1-12d1-46e2-8112-b6d9848844de','PHI0007 2','6a7c8700-3dd0-46f0-b6de-79cdf79a04ef'),
     ('a5a38c7c-9b7d-45d5-b84f-b2365f7d14c4','PHI0007 3','6a7c8700-3dd0-46f0-b6de-79cdf79a04ef'),
     ('af14befa-6203-459d-ae31-cbd71e8cca0e','PHI0007 4','6a7c8700-3dd0-46f0-b6de-79cdf79a04ef'),
     ('f3277849-62ef-4ead-bb7f-3c3e7a9d832f','PHY0001 1','a4a43146-c34e-4740-b316-ed14313a255d'),
     ('9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','PHY0001 2','a4a43146-c34e-4740-b316-ed14313a255d'),
     ('48ec44ba-9413-46cd-92d1-866f58092166','PHY0001 3','a4a43146-c34e-4740-b316-ed14313a255d'),
     ('716d7d62-b4ec-4749-a7a6-8a05fa229cf3','PHY0001 4','a4a43146-c34e-4740-b316-ed14313a255d');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('2fa71b2a-82f9-4f4a-99e5-5b513361957e','PHY0002 1','8e45bccd-9222-4d0f-a5df-3e9a7bd6f74c'),
     ('0678c3f9-c14c-4ac8-82d8-84ceb93af430','PHY0002 2','8e45bccd-9222-4d0f-a5df-3e9a7bd6f74c'),
     ('7c581969-99db-40f8-b4d1-f8b0a244cc2f','PHY0002 3','8e45bccd-9222-4d0f-a5df-3e9a7bd6f74c'),
     ('fbea9b30-2290-4cbb-8392-be84158648a0','PHY0002 4','8e45bccd-9222-4d0f-a5df-3e9a7bd6f74c'),
     ('c5746a37-c2f7-438e-a004-2d8b62eb8b8c','PHY0003 1','2eb853c7-9195-42d3-afee-f6c079f45d8e'),
     ('d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','PHY0003 2','2eb853c7-9195-42d3-afee-f6c079f45d8e'),
     ('ab998306-eab1-45ce-99fb-475fe005bfb3','PHY0003 3','2eb853c7-9195-42d3-afee-f6c079f45d8e'),
     ('a4025bc1-6871-4549-8f48-7cb0988a49ea','PHY0003 4','2eb853c7-9195-42d3-afee-f6c079f45d8e'),
     ('79dbd01d-717c-483a-9797-bfa1aee8707f','PHY0004 1','90d680fb-07a8-4661-b2c6-24a765f477e0'),
     ('e16633b3-55b9-4acb-9e36-e3b3551c5be8','PHY0004 2','90d680fb-07a8-4661-b2c6-24a765f477e0');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('a25d639f-435a-40fb-96d9-867e437eaa1b','PHY0004 3','90d680fb-07a8-4661-b2c6-24a765f477e0'),
     ('b469ad32-ed71-4201-9b6c-4f300b2a480d','PHY0004 4','90d680fb-07a8-4661-b2c6-24a765f477e0'),
     ('7a8a6302-d49a-4dec-b1be-858c8cc1c2aa','PHY0005 1','91e6a911-24b1-46b6-8ab5-1343264b4c25'),
     ('9cc8a6ab-714a-4af9-b166-5811303c9708','PHY0005 2','91e6a911-24b1-46b6-8ab5-1343264b4c25'),
     ('ff5da20e-719f-4546-9050-b51ce5893289','PHY0005 3','91e6a911-24b1-46b6-8ab5-1343264b4c25'),
     ('9b86ac80-e2cb-45c3-900a-bc9d6692f9e1','PHY0005 4','91e6a911-24b1-46b6-8ab5-1343264b4c25'),
     ('a7d95827-e81a-45f3-b863-d5242c170545','PHY0006 1','43a69402-7f7b-46e1-bb5a-92e74c858b7a'),
     ('40fb1281-c7d9-4066-9308-e911783ce188','PHY0006 2','43a69402-7f7b-46e1-bb5a-92e74c858b7a'),
     ('d9514ea9-a38d-4d4e-a448-08e195b083fb','PHY0006 3','43a69402-7f7b-46e1-bb5a-92e74c858b7a'),
     ('04197ba3-83ff-4ccb-8344-c416866cdce3','PHY0006 4','43a69402-7f7b-46e1-bb5a-92e74c858b7a');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('18f5f8ba-4d0c-441f-aabe-9a02503d24bf','PHY0007 1','c35c20ce-3fe9-447f-954f-a3f62034f2e9'),
     ('0f9ce201-dbb0-4dd2-9854-2707e6b40201','PHY0007 2','c35c20ce-3fe9-447f-954f-a3f62034f2e9'),
     ('7c980fde-0868-4ac0-92e3-330db7529b74','PHY0007 3','c35c20ce-3fe9-447f-954f-a3f62034f2e9'),
     ('ac92b131-1eee-43b9-9c53-709aaad81ae5','PHY0007 4','c35c20ce-3fe9-447f-954f-a3f62034f2e9'),
     ('b4d0e92e-f607-4f07-b8f8-fb0985775292','CHE0001 1','0eb27482-00c3-4be1-9aab-a28ef7d9de36'),
     ('52e416ed-2057-4bdf-b581-69fc64419d5d','CHE0001 2','0eb27482-00c3-4be1-9aab-a28ef7d9de36'),
     ('f3342d28-c729-4dd9-b19e-564446e89557','CHE0001 3','0eb27482-00c3-4be1-9aab-a28ef7d9de36'),
     ('f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','CHE0001 4','0eb27482-00c3-4be1-9aab-a28ef7d9de36'),
     ('a4fd4b25-55e9-49ee-b25a-e5a00a03d546','CHE0002 1','71fdd915-e2bd-4468-b899-11bf508d6f57'),
     ('f00ecf87-1b80-41cf-b680-b7f3b32b626c','CHE0002 2','71fdd915-e2bd-4468-b899-11bf508d6f57');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('0f9ccfc0-8809-4918-b688-3326d7510e2c','CHE0002 3','71fdd915-e2bd-4468-b899-11bf508d6f57'),
     ('498aa683-e4fa-45dc-b265-56b002414598','CHE0002 4','71fdd915-e2bd-4468-b899-11bf508d6f57'),
     ('115a528e-042b-4055-bc97-ba7a1b5dc412','CHE0003 1','22afbdcb-74a3-4c56-99bc-20150e1c43bb'),
     ('724b55b5-650f-4526-aeba-df3d907b7ad5','CHE0003 2','22afbdcb-74a3-4c56-99bc-20150e1c43bb'),
     ('8aad9ff1-bfe4-4852-bb56-cda6359ed5bf','CHE0003 3','22afbdcb-74a3-4c56-99bc-20150e1c43bb'),
     ('37bc394a-7d32-49ea-b123-16e9de728b62','CHE0003 4','22afbdcb-74a3-4c56-99bc-20150e1c43bb'),
     ('42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','CHE0004 1','1727b2c6-0ba1-4238-a193-9067a7bb0495'),
     ('1f153562-754c-42cb-950d-9331304561b3','CHE0004 2','1727b2c6-0ba1-4238-a193-9067a7bb0495'),
     ('fb1771b0-a925-4a76-bc59-5038b7a1fa31','CHE0004 3','1727b2c6-0ba1-4238-a193-9067a7bb0495'),
     ('6e0a9e64-cfec-4afa-aa19-839412112cdf','CHE0004 4','1727b2c6-0ba1-4238-a193-9067a7bb0495');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('43530bb8-eb01-4158-8a8b-9ee1d2548dbc','CHE0005 1','68c68952-a6e1-4cd5-b69a-dd6c6f82dd80'),
     ('1273e758-dc43-4173-9ded-49966af829d0','CHE0005 2','68c68952-a6e1-4cd5-b69a-dd6c6f82dd80'),
     ('0dd229b4-bf6b-450f-bade-2295cfb8c2f6','CHE0005 3','68c68952-a6e1-4cd5-b69a-dd6c6f82dd80'),
     ('5cc0a92e-9ba2-4833-9cb8-25f48730e7d3','CHE0005 4','68c68952-a6e1-4cd5-b69a-dd6c6f82dd80'),
     ('3d633591-6215-4adc-a453-40e68ec916a4','CHE0006 1','ae1ff02c-366a-419b-8198-21976ebee68a'),
     ('7d7f447f-d0ef-4ab7-8d45-9990796c9094','CHE0006 2','ae1ff02c-366a-419b-8198-21976ebee68a'),
     ('e9110b99-b085-4070-b27d-901aeb8ddafb','CHE0006 3','ae1ff02c-366a-419b-8198-21976ebee68a'),
     ('d53d6ec8-b106-448e-ad64-8664daa53a51','CHE0006 4','ae1ff02c-366a-419b-8198-21976ebee68a'),
     ('9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','CHE0007 1','67a2f9f7-0514-40c9-bc8a-c82c634b0e9e'),
     ('8b67aaa0-d4eb-45ab-9d41-97e5d4ddae1a','CHE0007 2','67a2f9f7-0514-40c9-bc8a-c82c634b0e9e');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','CHE0007 3','67a2f9f7-0514-40c9-bc8a-c82c634b0e9e'),
     ('75428ee5-d717-4869-a69c-3e3291a36588','CHE0007 4','67a2f9f7-0514-40c9-bc8a-c82c634b0e9e'),
     ('002260f4-e718-419f-bd96-8cc39b743013','LIT0001 1','e53af27b-c645-4dc1-9267-f2fe9c9f0d38'),
     ('bec4c6f8-8b05-479d-b0c8-916556329916','LIT0001 2','e53af27b-c645-4dc1-9267-f2fe9c9f0d38'),
     ('9231e3ad-6b2e-4fce-810e-963b45adeb84','LIT0001 3','e53af27b-c645-4dc1-9267-f2fe9c9f0d38'),
     ('837b194c-d0ff-406b-ad3e-c0a499451ca0','LIT0001 4','e53af27b-c645-4dc1-9267-f2fe9c9f0d38'),
     ('5466a968-f9c8-477f-b7f0-f3adb1e55470','LIT0002 1','c36a6993-6f36-4e56-b40c-1246773900c5'),
     ('5e17d1ff-5cd1-4736-a123-635b36225eea','LIT0002 2','c36a6993-6f36-4e56-b40c-1246773900c5'),
     ('06332dcf-95ae-4268-be24-c4496f1913f0','LIT0002 3','c36a6993-6f36-4e56-b40c-1246773900c5'),
     ('edf26d44-e2df-4bae-aae9-cfbf5bd37a35','LIT0002 4','c36a6993-6f36-4e56-b40c-1246773900c5');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','LIT0003 1','5ef93c84-91de-4207-8772-4b8b5b234f08'),
     ('67fa4c58-4422-4002-a717-f54b45a687f7','LIT0003 2','5ef93c84-91de-4207-8772-4b8b5b234f08'),
     ('0c718674-7871-4988-8746-3b40027ac3b1','LIT0003 3','5ef93c84-91de-4207-8772-4b8b5b234f08'),
     ('fae9d942-de16-48d5-8e27-3c271e6071f6','LIT0003 4','5ef93c84-91de-4207-8772-4b8b5b234f08'),
     ('43494e4b-420d-460b-a057-2b004ff8654b','LIT0004 1','4ca3df67-99da-4784-b7d9-8456053ab647'),
     ('f4cf9bf0-dd04-46e7-9473-179d073ff6f8','LIT0004 2','4ca3df67-99da-4784-b7d9-8456053ab647'),
     ('72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','LIT0004 3','4ca3df67-99da-4784-b7d9-8456053ab647'),
     ('7dfc26f3-df2f-42fc-be4d-26ff0e74cf4c','LIT0004 4','4ca3df67-99da-4784-b7d9-8456053ab647'),
     ('0797bfbf-9574-4264-9187-548f22b108a3','LIT0005 1','b3632e3d-2b82-44c8-8766-863c81990c79'),
     ('cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','LIT0005 2','b3632e3d-2b82-44c8-8766-863c81990c79');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('57220801-cfd2-409d-9efc-16f5c55ec521','LIT0005 3','b3632e3d-2b82-44c8-8766-863c81990c79'),
     ('6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','LIT0005 4','b3632e3d-2b82-44c8-8766-863c81990c79'),
     ('cd93b7f2-4002-433b-96d5-f1346fb6f036','LIT0006 1','2ed380d8-799b-4c24-8c13-3a9828bb478d'),
     ('ba4af011-5baa-4346-a9cb-391a14138991','LIT0006 2','2ed380d8-799b-4c24-8c13-3a9828bb478d'),
     ('f2c128c7-3e4b-404d-b824-fddfc44d4c72','LIT0006 3','2ed380d8-799b-4c24-8c13-3a9828bb478d'),
     ('7fb796f0-26a3-44e6-adf1-98f2f54e694b','LIT0006 4','2ed380d8-799b-4c24-8c13-3a9828bb478d'),
     ('1f2fedb8-f19e-4865-8216-85f799d8beef','LIT0007 1','13c594b2-68f7-44eb-80c1-32bb33ac088b'),
     ('273e1045-52b0-47fb-9023-897a0c77a2ce','LIT0007 2','13c594b2-68f7-44eb-80c1-32bb33ac088b'),
     ('fb4a06e5-2a31-439a-8935-367670c1e060','LIT0007 3','13c594b2-68f7-44eb-80c1-32bb33ac088b'),
     ('a3a3166e-1e81-4527-b545-c90ca0c6366a','LIT0007 4','13c594b2-68f7-44eb-80c1-32bb33ac088b');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('03f52765-4e12-454a-9e79-d8b8be7d7928','SPO0001 1','5fcae8fc-1022-46d2-a7cc-17f436753d96'),
     ('30c2ec07-d373-42a0-8394-2944a209eea9','SPO0001 2','5fcae8fc-1022-46d2-a7cc-17f436753d96'),
     ('57cecd71-4967-4aa1-81b0-2d5b89f08692','SPO0001 3','5fcae8fc-1022-46d2-a7cc-17f436753d96'),
     ('83675628-8d93-48b5-9234-46f30d460a0a','SPO0001 4','5fcae8fc-1022-46d2-a7cc-17f436753d96'),
     ('1910c4d7-0011-4b2c-ab65-8f3f3895a499','SPO0002 1','b8401d53-c097-4cf2-9e99-58bde3b1bc85'),
     ('241ed246-259d-4da6-bdb0-8746da664587','SPO0002 2','b8401d53-c097-4cf2-9e99-58bde3b1bc85'),
     ('124e4785-053a-4125-8bd7-f8738d667c4e','SPO0002 3','b8401d53-c097-4cf2-9e99-58bde3b1bc85'),
     ('69f29151-e648-4689-88e6-1ceaed25a7af','SPO0002 4','b8401d53-c097-4cf2-9e99-58bde3b1bc85'),
     ('9f96c58b-8753-4732-a0d4-05477a9a39f5','SPO0003 1','7850c256-18a0-41d9-a887-39cd856a1441'),
     ('e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','SPO0003 2','7850c256-18a0-41d9-a887-39cd856a1441');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('a898a4c7-9704-4ada-bbca-040b5e7ec1cc','SPO0003 3','7850c256-18a0-41d9-a887-39cd856a1441'),
     ('3d016b73-5721-46a0-aded-c522e70c61b8','SPO0003 4','7850c256-18a0-41d9-a887-39cd856a1441'),
     ('564e84c3-0791-432c-9dd1-f5f41da54861','SPO0004 1','44abb021-882c-457e-98b4-6112bb8f8dc9'),
     ('47df138d-c714-4344-844f-858d9307f5f3','SPO0004 2','44abb021-882c-457e-98b4-6112bb8f8dc9'),
     ('a05eef2f-5eec-4520-b647-98a890495b67','SPO0004 3','44abb021-882c-457e-98b4-6112bb8f8dc9'),
     ('b01b4cc0-687a-415b-9fb6-d75466f5ccd3','SPO0004 4','44abb021-882c-457e-98b4-6112bb8f8dc9'),
     ('9f7c1428-0df3-48c5-a187-d33d6ac03006','SPO0005 1','7ecbef91-b7d9-4708-9b62-6f1aa7d34ece'),
     ('9d0c479f-8051-42b5-9fda-4050621fc41b','SPO0005 2','7ecbef91-b7d9-4708-9b62-6f1aa7d34ece'),
     ('fd5ec0d5-6819-4fb3-a67d-5c66908928f2','SPO0005 3','7ecbef91-b7d9-4708-9b62-6f1aa7d34ece'),
     ('e5d0db67-242a-4b88-b335-ccc0d0af8879','SPO0005 4','7ecbef91-b7d9-4708-9b62-6f1aa7d34ece');
  INSERT INTO public."group" (id,code,subject_id) VALUES
     ('13dafda4-726b-4318-b683-816ba41cc201','SPO0006 1','c40cc5cc-5025-47b5-aded-b08de2a495ce'),
     ('61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','SPO0006 2','c40cc5cc-5025-47b5-aded-b08de2a495ce'),
     ('5da4cb5d-bea9-4409-b3ce-004a48ccf763','SPO0006 3','c40cc5cc-5025-47b5-aded-b08de2a495ce'),
     ('6a65e3fb-9899-4ffd-9b14-40162d95b0b8','SPO0006 4','c40cc5cc-5025-47b5-aded-b08de2a495ce'),
     ('0acc5e48-5c5b-4a90-8758-3476bdc751fb','SPO0007 1','9e464c14-a4de-4dbe-b372-13853a4490c3'),
     ('afb07919-382b-4ac2-8ca2-5e5b04445840','SPO0007 2','9e464c14-a4de-4dbe-b372-13853a4490c3'),
     ('03d1c9fb-a17e-418b-92e5-8f278225ef12','SPO0007 3','9e464c14-a4de-4dbe-b372-13853a4490c3'),
     ('414343ae-bf9c-41a8-a79f-126804314ea6','SPO0007 4','9e464c14-a4de-4dbe-b372-13853a4490c3');
  
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('58593aff-2f9d-4785-84af-c08b14362ca3','b469ad32-ed71-4201-9b6c-4f300b2a480d','4a22d805-5f3f-4139-b57f-dc2750192d99','2024-02-06 12:53:03.349712'),
     ('542a7df6-5afd-414c-9b99-bda69aaf55a6','03f52765-4e12-454a-9e79-d8b8be7d7928','4a22d805-5f3f-4139-b57f-dc2750192d99','2024-02-06 12:53:03.349712'),
     ('7af035e9-c452-4dbd-9f48-a3293f82723c','bf4fa5eb-4819-4034-b5b8-d172cb1c7b8c','4a22d805-5f3f-4139-b57f-dc2750192d99','2024-02-06 12:53:03.349712'),
     ('cf68ddad-613e-4bf2-ba8c-05c7d98ec211','4c70dbd1-12d1-46e2-8112-b6d9848844de','4a22d805-5f3f-4139-b57f-dc2750192d99','2024-02-06 12:53:03.349712'),
     ('058d62c4-210d-448a-b663-d411858b96f9','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','4a22d805-5f3f-4139-b57f-dc2750192d99','2024-02-06 12:53:03.349712'),
     ('116be672-2f06-4cc9-9e53-cc3e872988c7','dedf0663-486e-489b-abba-22c8106ff1a6','c370532e-dcd9-4ad5-863d-c26be43dde22','2024-02-08 13:29:34.752941'),
     ('1fb73243-844c-4451-99c4-9212a9e438c7','9d0c479f-8051-42b5-9fda-4050621fc41b','c370532e-dcd9-4ad5-863d-c26be43dde22','2024-02-08 13:29:34.752941'),
     ('f167e2ed-8ea8-4f01-beb9-db047487b1c2','8539137f-49e3-43a9-8340-806146c7f27a','c370532e-dcd9-4ad5-863d-c26be43dde22','2024-02-08 13:29:34.752941'),
     ('50151e22-e3d4-4906-9ff1-da60845368dd','80f0d83a-2e2d-46c0-a2cf-e90950b22d15','c370532e-dcd9-4ad5-863d-c26be43dde22','2024-02-08 13:29:34.752941'),
     ('927f0724-85b3-4f0b-b802-6b31d414620a','d53d6ec8-b106-448e-ad64-8664daa53a51','c370532e-dcd9-4ad5-863d-c26be43dde22','2024-02-08 13:29:34.752941');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('1ce7e5b8-75d4-46d4-a0fc-e00ef67b510b','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','73ca1e2a-2fa2-457b-980f-cee8ffc9229c','2024-02-01 09:44:12.426711'),
     ('f375729a-7e20-45bf-8c7b-8c02c23734c8','f00ecf87-1b80-41cf-b680-b7f3b32b626c','73ca1e2a-2fa2-457b-980f-cee8ffc9229c','2024-02-01 09:44:12.426711'),
     ('f516240a-62bb-46a2-8c1a-60f1d84fa359','fb1771b0-a925-4a76-bc59-5038b7a1fa31','73ca1e2a-2fa2-457b-980f-cee8ffc9229c','2024-02-01 09:44:12.426711'),
     ('9121f131-356a-40d4-bbac-a95900ea6721','2fa71b2a-82f9-4f4a-99e5-5b513361957e','73ca1e2a-2fa2-457b-980f-cee8ffc9229c','2024-02-01 09:44:12.426711'),
     ('b0f2f6e2-6fcd-4d4a-a23e-fc4091f411ee','4c70dbd1-12d1-46e2-8112-b6d9848844de','73ca1e2a-2fa2-457b-980f-cee8ffc9229c','2024-02-01 09:44:12.426711'),
     ('1a5e5f0a-7aa4-4305-9973-c45995078ba5','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','426a35c6-a300-45ad-af12-abc7cb00953b','2024-02-05 09:15:40.52218'),
     ('84571b4b-34e9-4bb5-9308-a70407b9e899','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','426a35c6-a300-45ad-af12-abc7cb00953b','2024-02-05 09:15:40.52218'),
     ('c0278294-75ad-4dbe-85df-efabca855f7e','9d0c479f-8051-42b5-9fda-4050621fc41b','426a35c6-a300-45ad-af12-abc7cb00953b','2024-02-05 09:15:40.52218'),
     ('887990ec-58e0-402b-b605-21f1e125a1df','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','426a35c6-a300-45ad-af12-abc7cb00953b','2024-02-05 09:15:40.52218'),
     ('5df19d4c-ec3e-491d-90eb-ed974c69f79f','18883ccb-71e0-4af7-ae0f-4be8a69472c1','2e3b0bd4-619f-4399-af0a-d9d9cdbd2669','2024-02-05 12:05:57.965609');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('db53364c-4498-4a0a-81ed-0f64551b6bf3','37bc394a-7d32-49ea-b123-16e9de728b62','2e3b0bd4-619f-4399-af0a-d9d9cdbd2669','2024-02-05 12:05:57.965609'),
     ('72702343-fad7-442e-9237-51b90f969313','0acc5e48-5c5b-4a90-8758-3476bdc751fb','2e3b0bd4-619f-4399-af0a-d9d9cdbd2669','2024-02-05 12:05:57.965609'),
     ('76cdaee5-f70a-4622-b7eb-d1de76859895','b469ad32-ed71-4201-9b6c-4f300b2a480d','2e3b0bd4-619f-4399-af0a-d9d9cdbd2669','2024-02-05 12:05:57.965609'),
     ('d8c0809c-1a20-4dc1-b4df-efdde501264b','3d016b73-5721-46a0-aded-c522e70c61b8','e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','2024-02-08 11:42:46.040735'),
     ('6fd26587-0aab-49bd-8e79-0f5af400b11d','54ef1506-540c-4567-afb9-406ae9d95e34','e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','2024-02-08 11:42:46.040735'),
     ('79c3badb-d97c-4fa1-aadf-1db53f3c2675','80f0d83a-2e2d-46c0-a2cf-e90950b22d15','e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','2024-02-08 11:42:46.040735'),
     ('f0c49a63-ae42-47d0-82e8-5704c2ade1af','0bc91ddb-22b0-4e77-928b-2ebfe438e7f0','e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','2024-02-08 11:42:46.040735'),
     ('cf57c32a-c7af-4732-acae-f3976581c9db','e16633b3-55b9-4acb-9e36-e3b3551c5be8','e8c8d77b-c94c-4fbb-8ab6-3be630b1bdcc','2024-02-08 11:42:46.040735'),
     ('7629d7c0-3679-4d3e-aa85-4e6898e37a2f','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','e4387b6f-6a03-4804-9a03-b372a50b0b88','2024-02-08 13:09:10.806012'),
     ('a500841d-9a41-4fea-8536-d5d3a378dc1a','48ec44ba-9413-46cd-92d1-866f58092166','e4387b6f-6a03-4804-9a03-b372a50b0b88','2024-02-08 13:09:10.806012');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a4ab4e2d-b9f8-4689-a54d-b7ff0854e74a','3d633591-6215-4adc-a453-40e68ec916a4','e4387b6f-6a03-4804-9a03-b372a50b0b88','2024-02-08 13:09:10.806012'),
     ('f368f16f-b5e3-4632-8c16-8beb8e4441ad','b8322e1b-079a-44de-ad59-4978b2fd4dcc','e4387b6f-6a03-4804-9a03-b372a50b0b88','2024-02-08 13:09:10.806012'),
     ('d9af86a6-0a72-4513-9dad-3a1068a55149','5466a968-f9c8-477f-b7f0-f3adb1e55470','e4387b6f-6a03-4804-9a03-b372a50b0b88','2024-02-08 13:09:10.806012'),
     ('3e0735a0-f191-4259-925d-3353dd637eaa','3d633591-6215-4adc-a453-40e68ec916a4','37569f54-bb00-4ddb-8131-7fea52fbf68f','2024-02-07 16:22:20.43978'),
     ('ca3ba8ca-4abb-4f2c-af86-7892040f912d','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','37569f54-bb00-4ddb-8131-7fea52fbf68f','2024-02-07 16:22:20.43978'),
     ('636dfa29-fe54-4acc-ba8a-6a1b07a3c6f9','560191fc-18f7-4962-ae5e-f3f1df01bd02','37569f54-bb00-4ddb-8131-7fea52fbf68f','2024-02-07 16:22:20.43978'),
     ('ea5d2194-083c-48c9-9373-94ff77529ccc','75428ee5-d717-4869-a69c-3e3291a36588','37569f54-bb00-4ddb-8131-7fea52fbf68f','2024-02-07 16:22:20.43978'),
     ('dc111570-7b1a-4140-9cec-faba02a8f9b8','ac38f34b-99d1-4a4d-acb8-738b299fb79c','37569f54-bb00-4ddb-8131-7fea52fbf68f','2024-02-07 16:22:20.43978'),
     ('232773b9-e62f-4e5b-8c7a-e666125c3682','40fb1281-c7d9-4066-9308-e911783ce188','55b3eeda-a410-441e-bc85-c183ba5ebe3a','2024-02-02 12:03:51.913556'),
     ('dc27fb0a-5e01-47d0-865c-5ca8e4c7a2dc','934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','55b3eeda-a410-441e-bc85-c183ba5ebe3a','2024-02-02 12:03:51.913556');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('0536c7ab-b32f-4dc7-9c2e-168b0e40a41c','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','55b3eeda-a410-441e-bc85-c183ba5ebe3a','2024-02-02 12:03:51.913556'),
     ('20723463-b916-4fb9-aad6-f3b37b521558','5466a968-f9c8-477f-b7f0-f3adb1e55470','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('41d3f59c-4dc5-45d5-8eb8-3582b56d9e02','8e1699ec-8969-409e-ae00-fe9d697edebb','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('a807f84b-ea84-41a6-a5b7-414970f2df4d','fbea9b30-2290-4cbb-8392-be84158648a0','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('d7800df6-0799-49c8-8e44-6688e8010715','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('a08b0367-c33c-4002-bdd1-03615dd07149','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('0238415f-7c94-473d-82cb-524262534ada','498aa683-e4fa-45dc-b265-56b002414598','c1beae9f-e757-4810-bfb3-ece9ec708921','2024-02-06 14:16:07.386091'),
     ('f4a3aa71-74e3-4f3c-a075-fa377e5dc022','4c70dbd1-12d1-46e2-8112-b6d9848844de','3f0b69cf-67ed-471a-9c00-a177cbb43009','2024-02-07 11:11:07.737801'),
     ('846facd1-3dc9-40c7-b007-65be5d5628cc','a4025bc1-6871-4549-8f48-7cb0988a49ea','3f0b69cf-67ed-471a-9c00-a177cbb43009','2024-02-07 11:11:07.737801'),
     ('d71aa6ff-06a3-45e5-9065-84dc280a2fd9','9f96c58b-8753-4732-a0d4-05477a9a39f5','3f0b69cf-67ed-471a-9c00-a177cbb43009','2024-02-07 11:11:07.737801');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('3d5139e1-4efe-438d-91e9-d15403ff4e00','33631b9f-0169-4cae-8403-93aa80127cbc','3f0b69cf-67ed-471a-9c00-a177cbb43009','2024-02-07 11:11:07.737801'),
     ('f6431596-fe7c-4e1d-8acb-b90dacfe9aa9','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('10b37b78-20ab-4d30-b6a4-7e0b4a4258bb','16e9371d-0c20-47cd-b28a-0f9f34971dde','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('59c9880a-44ad-41c0-a62a-1e1365158c46','afb07919-382b-4ac2-8ca2-5e5b04445840','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('ad00f937-75cc-495e-9ac4-ee7c6c111623','c8c4650c-71c8-46ef-b813-f09e063dbc99','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('1103cbef-0c92-4c0b-866f-12a049082892','7c581969-99db-40f8-b4d1-f8b0a244cc2f','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('ab2d5d80-1109-45a2-8a89-89e5f409b042','7fb796f0-26a3-44e6-adf1-98f2f54e694b','01348dfb-b923-4e4a-af85-6d3e640f435e','2024-02-06 11:12:51.53758'),
     ('8fa1217d-5465-4618-a152-d6b03d028d4f','3d016b73-5721-46a0-aded-c522e70c61b8','ae04681c-6e33-4cb7-8e4c-9888b4fa8ed5','2024-02-07 11:25:24.21268'),
     ('0203f659-c928-42b0-a780-6a8b27932687','37bc394a-7d32-49ea-b123-16e9de728b62','ae04681c-6e33-4cb7-8e4c-9888b4fa8ed5','2024-02-07 11:25:24.21268'),
     ('e5f59e1e-e905-4f85-aaec-0d5ee924aaa8','b8322e1b-079a-44de-ad59-4978b2fd4dcc','ae04681c-6e33-4cb7-8e4c-9888b4fa8ed5','2024-02-07 11:25:24.21268');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('160de05b-9120-4b72-b94f-b56d5367ff7d','57cecd71-4967-4aa1-81b0-2d5b89f08692','d5c7ad00-9f38-4859-872c-d0f881dc7d42','2024-02-07 14:00:39.255458'),
     ('48ebc5fd-5ea3-4920-8819-0912a3e1d338','afb07919-382b-4ac2-8ca2-5e5b04445840','d5c7ad00-9f38-4859-872c-d0f881dc7d42','2024-02-07 14:00:39.255458'),
     ('5313b57b-6f45-41e2-bfc2-9c8a4750a7af','4fa7b45c-d365-4d3a-86ad-9f18573a5512','d5c7ad00-9f38-4859-872c-d0f881dc7d42','2024-02-07 14:00:39.255458'),
     ('191272f9-9b6c-411d-990a-5a233f349d23','06332dcf-95ae-4268-be24-c4496f1913f0','d5c7ad00-9f38-4859-872c-d0f881dc7d42','2024-02-07 14:00:39.255458'),
     ('01461545-d164-4e31-8489-e07907d29342','ab998306-eab1-45ce-99fb-475fe005bfb3','d5c7ad00-9f38-4859-872c-d0f881dc7d42','2024-02-07 14:00:39.255458'),
     ('3cdecba0-15f1-4d0f-bb85-40a0443aac6c','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218'),
     ('fd81d843-3959-4736-a0d8-ba677a144bec','5da4cb5d-bea9-4409-b3ce-004a48ccf763','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218'),
     ('8c2dc256-e478-413a-8947-7cac3dfe042c','03d1c9fb-a17e-418b-92e5-8f278225ef12','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218'),
     ('91ce1db0-0db2-4913-9473-4df88054be0b','33631b9f-0169-4cae-8403-93aa80127cbc','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218'),
     ('eaa9394a-5218-4738-87e0-f2e7edeeb099','e9110b99-b085-4070-b27d-901aeb8ddafb','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('5b158e0e-938c-4fb7-ab7c-7dd387091105','79dbd01d-717c-483a-9797-bfa1aee8707f','f4bf56b7-a0cf-49ef-9b03-9935b3186d77','2024-02-04 14:09:45.308218'),
     ('2e471cac-8c99-4143-af31-b3924f40e28e','b12f9b56-0e18-4e37-b92b-79af1ec384bb','89454a47-1d72-497f-a65a-3fee12e9c88a','2024-02-02 15:03:04.314587'),
     ('cb2f025d-3a40-4ea8-bc8e-4b6250b38894','18883ccb-71e0-4af7-ae0f-4be8a69472c1','89454a47-1d72-497f-a65a-3fee12e9c88a','2024-02-02 15:03:04.314587'),
     ('387cdde1-9542-4b0c-9409-8db10d8c6e04','5466a968-f9c8-477f-b7f0-f3adb1e55470','89454a47-1d72-497f-a65a-3fee12e9c88a','2024-02-02 15:03:04.314587'),
     ('5772dcc4-8694-423f-ad38-4b4b5cade4c1','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','89454a47-1d72-497f-a65a-3fee12e9c88a','2024-02-02 15:03:04.314587'),
     ('97cb7e55-61a5-4190-81e0-8b66e509f7da','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','89454a47-1d72-497f-a65a-3fee12e9c88a','2024-02-02 15:03:04.314587'),
     ('7bc04c38-0da7-4447-a5cd-5ed47af1879e','a05eef2f-5eec-4520-b647-98a890495b67','0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','2024-02-04 14:19:54.260789'),
     ('bd66f8d2-9e5e-436c-89bc-0bc54d9090bf','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','2024-02-04 14:19:54.260789'),
     ('8b71be10-4bb6-4ee6-a3c6-014483e0ac47','33631b9f-0169-4cae-8403-93aa80127cbc','0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','2024-02-04 14:19:54.260789'),
     ('56ad0bb0-c9e3-4e8f-b7e8-a95270c5fa2a','8aad9ff1-bfe4-4852-bb56-cda6359ed5bf','0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','2024-02-04 14:19:54.260789');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a26f0738-894f-4010-888d-2ccde80e4385','934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','0360f5d7-b4c1-4e28-bffa-2ec8baa2018d','2024-02-04 14:19:54.260789'),
     ('28ae6128-480e-4c77-9a9f-8ffd0041bedc','bea0dc91-7503-47d3-83fb-55a08fc31ead','ee12053e-b572-43db-9a9a-939106b5570f','2024-02-07 13:54:10.269644'),
     ('a0658503-1e2a-4d58-a703-2986fd77257d','0c718674-7871-4988-8746-3b40027ac3b1','ee12053e-b572-43db-9a9a-939106b5570f','2024-02-07 13:54:10.269644'),
     ('f14f90f3-0f29-46f7-aab0-2730fd63691b','b9ba13f8-222f-4786-8c27-c237b134cc55','ee12053e-b572-43db-9a9a-939106b5570f','2024-02-07 13:54:10.269644'),
     ('1332a77f-91c8-4a26-b1f3-8add26083118','13dafda4-726b-4318-b683-816ba41cc201','ee12053e-b572-43db-9a9a-939106b5570f','2024-02-07 13:54:10.269644'),
     ('e8fd6cb2-ddc7-4b74-affc-9f9589a9cfa6','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','826e21cc-b5dd-4695-a4d2-e407c595559e','2024-02-06 10:58:15.371099'),
     ('1e52a26d-9489-4751-b066-cb5f6db64299','37bc394a-7d32-49ea-b123-16e9de728b62','826e21cc-b5dd-4695-a4d2-e407c595559e','2024-02-06 10:58:15.371099'),
     ('4a041c0d-9873-4bcb-8b60-d77948a25c97','1273e758-dc43-4173-9ded-49966af829d0','826e21cc-b5dd-4695-a4d2-e407c595559e','2024-02-06 10:58:15.371099'),
     ('b67b796a-cb24-4bd9-924e-82dd4d048918','13dafda4-726b-4318-b683-816ba41cc201','826e21cc-b5dd-4695-a4d2-e407c595559e','2024-02-06 10:58:15.371099'),
     ('4e84b8dd-151b-4e35-b30a-83efa59f1c9b','7c749acd-4feb-4a93-8339-13d9d3c42196','826e21cc-b5dd-4695-a4d2-e407c595559e','2024-02-06 10:58:15.371099');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('698193b3-c7f4-412b-b179-0cb36008bc61','fb4a06e5-2a31-439a-8935-367670c1e060','3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','2024-02-03 12:59:36.463498'),
     ('f5722006-cf09-4b07-a80c-2b8157e04da5','48ec44ba-9413-46cd-92d1-866f58092166','3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','2024-02-03 12:59:36.463498'),
     ('256230b9-4290-4c8e-8aaf-29bdc02a5cf6','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','2024-02-03 12:59:36.463498'),
     ('5e9e936d-f0df-4a77-acf7-ffcf220d9f08','7fb796f0-26a3-44e6-adf1-98f2f54e694b','3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','2024-02-03 12:59:36.463498'),
     ('7a27573d-7f87-4ef3-8cf3-9815d25fb2f6','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','3e37ae0b-0e7a-4956-b1c6-4e682fbb4f33','2024-02-03 12:59:36.463498'),
     ('bdcf7713-06fa-4d3d-8274-03ad0312693c','9d40faa9-3695-43d6-a19c-4dc329edb8f4','c3fc0c0a-0574-4ebf-b5fe-91853e4d5cb2','2024-02-01 14:42:44.955374'),
     ('bea9232b-7c44-4825-b181-7748f7dea45e','ac92b131-1eee-43b9-9c53-709aaad81ae5','c3fc0c0a-0574-4ebf-b5fe-91853e4d5cb2','2024-02-01 14:42:44.955374'),
     ('b047dd1c-a268-43ea-977e-df2a7e07cd78','9d0c479f-8051-42b5-9fda-4050621fc41b','c3fc0c0a-0574-4ebf-b5fe-91853e4d5cb2','2024-02-01 14:42:44.955374'),
     ('4d39e8a2-1500-48b7-810e-61aa21139edd','fae9d942-de16-48d5-8e27-3c271e6071f6','c3fc0c0a-0574-4ebf-b5fe-91853e4d5cb2','2024-02-01 14:42:44.955374'),
     ('bf1bc364-48ea-4bc4-afbd-2deda28f5e5e','2fa71b2a-82f9-4f4a-99e5-5b513361957e','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a3157af0-82af-4dfd-85f4-94630bf25c98','b4d0e92e-f607-4f07-b8f8-fb0985775292','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('2f2ecd52-b131-4487-a55f-4def4df9317e','72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('67f2c091-d509-46a0-abfb-313763ba2563','57cecd71-4967-4aa1-81b0-2d5b89f08692','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('d2ba9953-007e-437f-b6de-100b58874891','4fa7b45c-d365-4d3a-86ad-9f18573a5512','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('d4853101-1944-46ad-83b3-20801fa3c673','fae9d942-de16-48d5-8e27-3c271e6071f6','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('eda71fc6-7e98-4464-af35-38d47585ffc0','33631b9f-0169-4cae-8403-93aa80127cbc','573d024a-379e-4798-937c-bcad895a0aae','2024-02-03 16:04:04.93474'),
     ('320a6f81-eba1-4824-bc8a-adfb71495e44','2fa71b2a-82f9-4f4a-99e5-5b513361957e','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948'),
     ('555b2f49-175f-41ca-a79e-73c78dacef32','bea0dc91-7503-47d3-83fb-55a08fc31ead','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948'),
     ('1907ae47-e4c1-4b25-8110-87fcddb714d9','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948'),
     ('af5c8f10-3bc5-47db-80c5-272cc8f17c13','8b67aaa0-d4eb-45ab-9d41-97e5d4ddae1a','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('48524769-0b6c-43bd-98fe-515f37670255','a05eef2f-5eec-4520-b647-98a890495b67','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948'),
     ('a6f30e10-f728-4517-9812-7681303e0734','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','1df3cc00-a460-4d6c-83b2-5be397a9de90','2024-02-02 14:00:34.462948'),
     ('df34bb31-8eea-487d-9687-96e02be6a059','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','2a33da47-17a3-42f4-9a30-fcf046fc73b5','2024-02-06 11:19:54.499013'),
     ('867cb902-8ca5-4573-b58c-001d288ffc27','b469ad32-ed71-4201-9b6c-4f300b2a480d','2a33da47-17a3-42f4-9a30-fcf046fc73b5','2024-02-06 11:19:54.499013'),
     ('a971aadd-2b56-4b68-8b26-e8510086f868','ab998306-eab1-45ce-99fb-475fe005bfb3','2a33da47-17a3-42f4-9a30-fcf046fc73b5','2024-02-06 11:19:54.499013'),
     ('e3895545-5fcb-45e8-aca4-c8bfb6aedb05','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','2a33da47-17a3-42f4-9a30-fcf046fc73b5','2024-02-06 11:19:54.499013'),
     ('3f787852-06bd-4929-a699-42b55b330305','30c2ec07-d373-42a0-8394-2944a209eea9','2a33da47-17a3-42f4-9a30-fcf046fc73b5','2024-02-06 11:19:54.499013'),
     ('25865825-6b09-4f37-9711-fa2f9d3098eb','124e4785-053a-4125-8bd7-f8738d667c4e','600779ea-c92f-4dfa-98d8-1e6ce6cc2080','2024-02-01 13:03:07.787124'),
     ('ca433ca8-8197-40df-9925-8ee522d09da7','72209775-0fa0-422a-91ca-8f141731508e','600779ea-c92f-4dfa-98d8-1e6ce6cc2080','2024-02-01 13:03:07.787124'),
     ('ea7949e1-3d6f-4cb9-afe9-a54030fb6b84','1273e758-dc43-4173-9ded-49966af829d0','600779ea-c92f-4dfa-98d8-1e6ce6cc2080','2024-02-01 13:03:07.787124');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('44bb3ce8-52e0-49ea-9e5d-effa54503ecd','7c749acd-4feb-4a93-8339-13d9d3c42196','600779ea-c92f-4dfa-98d8-1e6ce6cc2080','2024-02-01 13:03:07.787124'),
     ('99eca703-b6d1-4dde-af26-a99576b9f9be','002260f4-e718-419f-bd96-8cc39b743013','600779ea-c92f-4dfa-98d8-1e6ce6cc2080','2024-02-01 13:03:07.787124'),
     ('51840c85-edd9-49e5-b206-49a546283f75','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','ac12171f-898a-4afe-b4d6-99759538ee6f','2024-02-04 11:49:21.901925'),
     ('9970ee76-c058-4ed4-9ab9-72d473a63613','afb07919-382b-4ac2-8ca2-5e5b04445840','ac12171f-898a-4afe-b4d6-99759538ee6f','2024-02-04 11:49:21.901925'),
     ('005052fb-e55c-49c5-968f-41420003871e','9d40faa9-3695-43d6-a19c-4dc329edb8f4','ac12171f-898a-4afe-b4d6-99759538ee6f','2024-02-04 11:49:21.901925'),
     ('93a06ca6-8fdf-4246-9609-15fb04a9d376','48ec44ba-9413-46cd-92d1-866f58092166','ac12171f-898a-4afe-b4d6-99759538ee6f','2024-02-04 11:49:21.901925'),
     ('5ffd61ea-9710-4d44-a7a1-ae50a0482d6a','52e416ed-2057-4bdf-b581-69fc64419d5d','ac12171f-898a-4afe-b4d6-99759538ee6f','2024-02-04 11:49:21.901925'),
     ('48bef699-e012-4f67-97c9-0b751a2b18eb','40986a1a-9949-43af-833f-8e3f007b1bfa','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984'),
     ('ec12656e-7880-41c4-b4dc-2be6766e5723','0f9ce201-dbb0-4dd2-9854-2707e6b40201','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984'),
     ('7662d676-8f49-41e9-8d0f-14bed52be8a4','1f153562-754c-42cb-950d-9331304561b3','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('974fd700-803e-45c8-a31a-3f9c93732e7e','37bc394a-7d32-49ea-b123-16e9de728b62','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984'),
     ('b2615b1f-eca3-4d06-9cfa-27f47969f83a','4c70dbd1-12d1-46e2-8112-b6d9848844de','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984'),
     ('a5812525-e65d-4bb6-92c8-3de0ea342130','30c2ec07-d373-42a0-8394-2944a209eea9','c1216115-6598-4cab-b72a-d8bcac0ffcab','2024-02-03 13:03:50.215984'),
     ('09af70bf-1cc1-4014-8390-8b3a5ea7c9d3','fae9d942-de16-48d5-8e27-3c271e6071f6','64143ed9-100c-4ef6-a657-470dbc635dff','2024-02-02 14:11:41.441826'),
     ('866a0392-b321-4d20-9e9e-4124fdca4439','83675628-8d93-48b5-9234-46f30d460a0a','64143ed9-100c-4ef6-a657-470dbc635dff','2024-02-02 14:11:41.441826'),
     ('8ca4bcb9-e4a4-470c-a71c-2f5d5cdcd392','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','64143ed9-100c-4ef6-a657-470dbc635dff','2024-02-02 14:11:41.441826'),
     ('49611ca8-ac64-4c3f-be1c-74ed5a0042c5','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','64143ed9-100c-4ef6-a657-470dbc635dff','2024-02-02 14:11:41.441826'),
     ('f58f81e2-30a7-4044-bd50-2e9252103502','3d633591-6215-4adc-a453-40e68ec916a4','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('85304046-0950-4d95-b351-f98832c1be63','bec4c6f8-8b05-479d-b0c8-916556329916','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('1670aeb4-3892-4c31-81fa-20608dc3bb6d','72a4f385-4733-447c-9900-7cf624110fde','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('dfdcd7b5-142e-4e29-9d9d-f43fb73d1c97','03f52765-4e12-454a-9e79-d8b8be7d7928','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('01fe504e-49cc-4e93-aa02-79d6e237c58f','37bc394a-7d32-49ea-b123-16e9de728b62','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('cb0384b7-26aa-4f3e-bd42-a0ee9944b1b6','a3a3166e-1e81-4527-b545-c90ca0c6366a','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('7ea2cfc1-3797-4a91-a732-981f5c262065','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','98849293-e6c1-4c82-96ce-f60f71603a21','2024-02-04 16:28:29.655734'),
     ('0e9357d1-91a5-481c-8ddb-1816213196c2','564e84c3-0791-432c-9dd1-f5f41da54861','d5a32784-dcc2-427e-96a4-2827aa9cdf02','2024-02-04 13:35:06.721349'),
     ('546e3752-be6d-4f32-9fb9-43f28693f4b0','9d0c479f-8051-42b5-9fda-4050621fc41b','d5a32784-dcc2-427e-96a4-2827aa9cdf02','2024-02-04 13:35:06.721349'),
     ('15a17248-9403-452d-9aed-f7fe9c0d9af5','e16633b3-55b9-4acb-9e36-e3b3551c5be8','d5a32784-dcc2-427e-96a4-2827aa9cdf02','2024-02-04 13:35:06.721349'),
     ('fe4c0cff-a520-44c3-b673-dd5060733e5c','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','d5a32784-dcc2-427e-96a4-2827aa9cdf02','2024-02-04 13:35:06.721349'),
     ('4dc50f93-6d32-41f0-bcfd-1a6d70d6cbff','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','d1eb1762-109a-46c2-823a-076eeeb3bfd7','2024-02-02 13:47:53.193877'),
     ('114cba0a-81a9-41af-8aa8-5753ddd36131','a4fd4b25-55e9-49ee-b25a-e5a00a03d546','d1eb1762-109a-46c2-823a-076eeeb3bfd7','2024-02-02 13:47:53.193877');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('34bb2b2c-9841-4b89-a491-6f098ad4faed','f4cf9bf0-dd04-46e7-9473-179d073ff6f8','d1eb1762-109a-46c2-823a-076eeeb3bfd7','2024-02-02 13:47:53.193877'),
     ('df1f2232-c0e0-4ccb-9b3c-391e2bd6564b','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','d1eb1762-109a-46c2-823a-076eeeb3bfd7','2024-02-02 13:47:53.193877'),
     ('3ebd6ea5-d42b-4083-966a-81d45d8aa744','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','d1eb1762-109a-46c2-823a-076eeeb3bfd7','2024-02-02 13:47:53.193877'),
     ('776ff854-1ab3-4ca5-814f-e971019aa363','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','39d91eb0-2525-44a0-964e-6fa2ab0ec624','2024-02-01 11:08:30.00202'),
     ('c3d531ab-1f70-45f0-9b24-40165bf4f486','934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','39d91eb0-2525-44a0-964e-6fa2ab0ec624','2024-02-01 11:08:30.00202'),
     ('d19c7250-504e-4a45-ada7-2b387e55f15c','241ed246-259d-4da6-bdb0-8746da664587','39d91eb0-2525-44a0-964e-6fa2ab0ec624','2024-02-01 11:08:30.00202'),
     ('a466b563-c4e0-4783-87b9-b324617936c9','0bc91ddb-22b0-4e77-928b-2ebfe438e7f0','39d91eb0-2525-44a0-964e-6fa2ab0ec624','2024-02-01 11:08:30.00202'),
     ('a4b9c39e-9ebb-42e8-9926-53f7f2bb0a3f','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','39d91eb0-2525-44a0-964e-6fa2ab0ec624','2024-02-01 11:08:30.00202'),
     ('84e33644-7e80-44ba-99be-ee347d8943e9','ba4af011-5baa-4346-a9cb-391a14138991','163ac53c-b053-43f8-ad16-50b28a3d398f','2024-02-07 14:10:57.208392'),
     ('1fed9ecb-4175-4cb5-bb10-17db1b9bc010','5e17d1ff-5cd1-4736-a123-635b36225eea','163ac53c-b053-43f8-ad16-50b28a3d398f','2024-02-07 14:10:57.208392');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('fec16d81-ea3e-41b6-b2b3-6b30a1c4ae11','72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','163ac53c-b053-43f8-ad16-50b28a3d398f','2024-02-07 14:10:57.208392'),
     ('99979abf-8e89-4cf5-8984-c424ff2bfb62','0acc5e48-5c5b-4a90-8758-3476bdc751fb','163ac53c-b053-43f8-ad16-50b28a3d398f','2024-02-07 14:10:57.208392'),
     ('d1d4347b-dd92-4f54-96b7-32d59166aa69','5e17d1ff-5cd1-4736-a123-635b36225eea','ec57f933-33e2-4388-a122-d1a355af628e','2024-02-05 14:16:26.0706'),
     ('2ad89c25-9abe-4b40-8d15-1f88a2258d07','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','ec57f933-33e2-4388-a122-d1a355af628e','2024-02-05 14:16:26.0706'),
     ('ae7c8acd-4304-4d7f-a99d-4766d2213bdd','b9ba13f8-222f-4786-8c27-c237b134cc55','ec57f933-33e2-4388-a122-d1a355af628e','2024-02-05 14:16:26.0706'),
     ('5a12115b-21af-47cb-8313-76edb3542be6','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','ec57f933-33e2-4388-a122-d1a355af628e','2024-02-05 14:16:26.0706'),
     ('60796800-edd5-4685-9b1e-4fb14a5a0f36','944c1df7-83fc-4e02-acfa-a051247ccb7b','b9523b86-89f0-4eeb-8d94-6988d9504cb9','2024-02-03 13:04:24.192353'),
     ('bdddb617-04ae-4887-9f3b-46631d0d1df7','a25d639f-435a-40fb-96d9-867e437eaa1b','b9523b86-89f0-4eeb-8d94-6988d9504cb9','2024-02-03 13:04:24.192353'),
     ('048716ed-b181-4d47-9f7d-aaca217bf417','7c581969-99db-40f8-b4d1-f8b0a244cc2f','b9523b86-89f0-4eeb-8d94-6988d9504cb9','2024-02-03 13:04:24.192353'),
     ('c4c66c79-160f-41ff-9ddf-40de3ea59738','9f96c58b-8753-4732-a0d4-05477a9a39f5','b9523b86-89f0-4eeb-8d94-6988d9504cb9','2024-02-03 13:04:24.192353');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('e611a56a-6687-423f-973e-c0e2ae81f473','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','1a892ea0-c137-493c-bb7e-7682c50b9c9a','2024-02-08 16:01:43.925555'),
     ('4943dbe4-3c5c-44c1-a360-0e2f94490a74','57cecd71-4967-4aa1-81b0-2d5b89f08692','1a892ea0-c137-493c-bb7e-7682c50b9c9a','2024-02-08 16:01:43.925555'),
     ('4daa74b9-9967-4f59-b058-84eae228c8e4','5466a968-f9c8-477f-b7f0-f3adb1e55470','1a892ea0-c137-493c-bb7e-7682c50b9c9a','2024-02-08 16:01:43.925555'),
     ('6a972cae-d40d-4490-8ce6-706a5572760b','f2c128c7-3e4b-404d-b824-fddfc44d4c72','1a892ea0-c137-493c-bb7e-7682c50b9c9a','2024-02-08 16:01:43.925555'),
     ('054248a0-74fe-4748-8dc4-627a5a2d614b','b469ad32-ed71-4201-9b6c-4f300b2a480d','1a892ea0-c137-493c-bb7e-7682c50b9c9a','2024-02-08 16:01:43.925555'),
     ('37da0aa3-ed3d-48f7-88ab-a9b18c171070','0c718674-7871-4988-8746-3b40027ac3b1','378517fe-bbfa-4cac-b483-28df5aef9f15','2024-02-01 13:37:17.445819'),
     ('ceb2fedf-ff69-4452-b71b-98bb0789a791','04197ba3-83ff-4ccb-8344-c416866cdce3','378517fe-bbfa-4cac-b483-28df5aef9f15','2024-02-01 13:37:17.445819'),
     ('75ca6484-3a5a-408f-aa72-2ff8099cf3c9','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','378517fe-bbfa-4cac-b483-28df5aef9f15','2024-02-01 13:37:17.445819'),
     ('f5d74fac-7b3e-45c8-a829-386b39bc23df','79dbd01d-717c-483a-9797-bfa1aee8707f','378517fe-bbfa-4cac-b483-28df5aef9f15','2024-02-01 13:37:17.445819'),
     ('dde8a25b-d6d3-4a1d-8159-ef9823fe111b','bea0dc91-7503-47d3-83fb-55a08fc31ead','d921439f-9ab8-423f-9a35-5b3ddbf8ec70','2024-02-01 14:38:33.714972');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('fbb36fb1-dafa-45a5-a0ad-f4c66acbf2af','ac92b131-1eee-43b9-9c53-709aaad81ae5','d921439f-9ab8-423f-9a35-5b3ddbf8ec70','2024-02-01 14:38:33.714972'),
     ('ee0fcb93-7912-4567-923a-cd2d45e35a6f','8c7e578b-4918-4e36-91d0-d77edd73a470','d921439f-9ab8-423f-9a35-5b3ddbf8ec70','2024-02-01 14:38:33.714972'),
     ('e47a41f8-8fdf-45db-9e68-bc5579431a46','a162d19b-bd43-4e3a-b989-fbc37b0d2b83','d921439f-9ab8-423f-9a35-5b3ddbf8ec70','2024-02-01 14:38:33.714972'),
     ('9816fbfe-5a84-4cf5-bcce-f97fa205ecce','6e0a9e64-cfec-4afa-aa19-839412112cdf','f3bcf608-9c70-46ad-8525-85fb98767903','2024-02-04 13:03:37.417629'),
     ('cf59bd7f-1e7b-461b-9762-42abf6868cab','75428ee5-d717-4869-a69c-3e3291a36588','f3bcf608-9c70-46ad-8525-85fb98767903','2024-02-04 13:03:37.417629'),
     ('e11c3c30-69d9-410a-bd88-c4871462044e','498aa683-e4fa-45dc-b265-56b002414598','f3bcf608-9c70-46ad-8525-85fb98767903','2024-02-04 13:03:37.417629'),
     ('04b36d4e-3ecf-47ea-a7f0-f2c3a32b9f90','3d016b73-5721-46a0-aded-c522e70c61b8','f3bcf608-9c70-46ad-8525-85fb98767903','2024-02-04 13:03:37.417629'),
     ('e34d361d-e427-43bb-a0f7-0f9568853f25','724b55b5-650f-4526-aeba-df3d907b7ad5','f3bcf608-9c70-46ad-8525-85fb98767903','2024-02-04 13:03:37.417629'),
     ('e86c7332-ba48-462c-8fee-c5740616382e','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','2024-02-01 15:54:14.301518'),
     ('440b660f-7366-4cf6-94b1-331331c485fb','73b5e884-070d-4c2a-b272-08c8fd05e44f','cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','2024-02-01 15:54:14.301518');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c49755dd-bb53-49ef-af62-d31da57a915c','f3342d28-c729-4dd9-b19e-564446e89557','cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','2024-02-01 15:54:14.301518'),
     ('095b3085-cb92-4752-b814-c2e3683b82ed','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','2024-02-01 15:54:14.301518'),
     ('a0c27d41-5050-4fa3-ab90-1a89fc3d02da','77f1be48-5c6b-44f8-ac52-7a760c7faf9c','cdcdf216-5f4f-4c91-a919-2c5c2bdf75f0','2024-02-01 15:54:14.301518'),
     ('1ffb635f-48b9-42aa-948b-bc48e5432ff2','fae9d942-de16-48d5-8e27-3c271e6071f6','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('a6d08b06-bf34-4db6-9449-624fb48bd911','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('11eee844-c470-4b40-ad70-bfdd19f267a6','0bc91ddb-22b0-4e77-928b-2ebfe438e7f0','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('874ba3b4-11a1-42c2-9ae5-b5ee2264c629','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('9016ab3b-e9bd-45a0-9161-a320a596f76b','a25d639f-435a-40fb-96d9-867e437eaa1b','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('597414dd-506f-4b68-8378-637613b9d825','0f9ccfc0-8809-4918-b688-3326d7510e2c','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587'),
     ('c8f0a6ce-0135-43d5-b323-9fd0c02d4fd1','bbfdda21-be2b-4fb4-b02c-b9de5902dd39','d7557d43-e1d8-4243-aa9c-e667a72f5e63','2024-02-07 13:34:00.950587');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c7be6397-955d-4462-b5c3-3d8243ed7d87','f3342d28-c729-4dd9-b19e-564446e89557','153fd38e-b9fd-4931-a7f9-b8fbb640ae62','2024-02-03 12:25:49.181409'),
     ('0582a5ec-8545-4c50-8683-8a58eacca571','fae9d942-de16-48d5-8e27-3c271e6071f6','153fd38e-b9fd-4931-a7f9-b8fbb640ae62','2024-02-03 12:25:49.181409'),
     ('c5b1f15c-5226-4c1e-b75c-d040a29ac283','498aa683-e4fa-45dc-b265-56b002414598','153fd38e-b9fd-4931-a7f9-b8fbb640ae62','2024-02-03 12:25:49.181409'),
     ('ea2d61d0-35c0-4e21-8f3c-4bb58f287adf','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','c42698b1-83b1-4073-b0ec-920abc8e724a','2024-02-03 12:01:47.455287'),
     ('47479a23-bf2b-42d0-8f21-b83bc93f2aea','9cc8a6ab-714a-4af9-b166-5811303c9708','c42698b1-83b1-4073-b0ec-920abc8e724a','2024-02-03 12:01:47.455287'),
     ('b9ee6caa-1d9a-4531-a223-99859955f033','4c70dbd1-12d1-46e2-8112-b6d9848844de','c42698b1-83b1-4073-b0ec-920abc8e724a','2024-02-03 12:01:47.455287'),
     ('5679130e-fb69-4ee0-99b4-9ecd061c9eeb','b4d0e92e-f607-4f07-b8f8-fb0985775292','c42698b1-83b1-4073-b0ec-920abc8e724a','2024-02-03 12:01:47.455287'),
     ('e2e4d2f6-338d-4c7f-8827-45f812132f38','72a4f385-4733-447c-9900-7cf624110fde','c42698b1-83b1-4073-b0ec-920abc8e724a','2024-02-03 12:01:47.455287'),
     ('759dc1a9-7b65-43a5-8f88-8203f4279d2b','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','914c9778-8085-411f-bac3-2a07ce314ac4','2024-02-02 11:31:54.043134'),
     ('71c8bab1-1fd3-41d6-9a5a-b97f7778de94','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','914c9778-8085-411f-bac3-2a07ce314ac4','2024-02-02 11:31:54.043134');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('de495e5e-463d-4ab6-974a-5c8e7d183412','edf26d44-e2df-4bae-aae9-cfbf5bd37a35','914c9778-8085-411f-bac3-2a07ce314ac4','2024-02-02 11:31:54.043134'),
     ('cae0e8bd-8ad3-4b94-870b-22aea35bcce7','724b55b5-650f-4526-aeba-df3d907b7ad5','914c9778-8085-411f-bac3-2a07ce314ac4','2024-02-02 11:31:54.043134'),
     ('8cb04df0-375c-44ff-842b-1d10a1e2e708','560191fc-18f7-4962-ae5e-f3f1df01bd02','914c9778-8085-411f-bac3-2a07ce314ac4','2024-02-02 11:31:54.043134'),
     ('177ae93d-f022-4879-b0eb-6c742333a3b4','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','3a12a073-03fa-40c5-ae63-033678ea9957','2024-02-03 10:38:05.296308'),
     ('f9440836-0b0e-483c-a428-79ca10dcee83','03d1c9fb-a17e-418b-92e5-8f278225ef12','3a12a073-03fa-40c5-ae63-033678ea9957','2024-02-03 10:38:05.296308'),
     ('43c2017d-35dc-40b0-a56d-2de4ec972e17','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','3a12a073-03fa-40c5-ae63-033678ea9957','2024-02-03 10:38:05.296308'),
     ('5f492ac0-5707-4208-83d5-b1879cbb2919','67fa4c58-4422-4002-a717-f54b45a687f7','3a12a073-03fa-40c5-ae63-033678ea9957','2024-02-03 10:38:05.296308'),
     ('f346dbb5-bed8-4f03-9073-a4e6998c5426','57cecd71-4967-4aa1-81b0-2d5b89f08692','ac64edc8-1d64-4f3c-bebc-0f43f117a36d','2024-02-01 12:40:26.645892'),
     ('dd859296-1c40-4f1c-842f-2d387d25411a','67fa4c58-4422-4002-a717-f54b45a687f7','ac64edc8-1d64-4f3c-bebc-0f43f117a36d','2024-02-01 12:40:26.645892'),
     ('1c0cd424-6305-467d-9183-900dbd72abc8','840d0b10-cce9-43d4-b57e-d381193335eb','ac64edc8-1d64-4f3c-bebc-0f43f117a36d','2024-02-01 12:40:26.645892');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('82009a32-64a8-43ab-bbdb-6f5af07b308b','7a8a6302-d49a-4dec-b1be-858c8cc1c2aa','ac64edc8-1d64-4f3c-bebc-0f43f117a36d','2024-02-01 12:40:26.645892'),
     ('3a6f0afa-2654-481a-8e58-908c3a09e902','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','ac64edc8-1d64-4f3c-bebc-0f43f117a36d','2024-02-01 12:40:26.645892'),
     ('ff193809-1b68-4e3d-b8dc-5496ad3769b7','d9514ea9-a38d-4d4e-a448-08e195b083fb','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('4600d6b0-55fd-4bf3-b10d-39dede4ad336','48ec44ba-9413-46cd-92d1-866f58092166','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('66d4b638-c81c-48b8-a8dc-6473c4efd4ce','2fa71b2a-82f9-4f4a-99e5-5b513361957e','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('15946c1b-1372-4dbc-bfed-fa800978c04d','7fb796f0-26a3-44e6-adf1-98f2f54e694b','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('8ec2c366-6d6b-4609-9b6a-acd30bdad391','72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('a3c83716-c39e-4b08-85b2-2f3459491593','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','944ea541-c6b7-49da-8c0f-db6aad99fa08','2024-02-03 16:17:53.41025'),
     ('3fb57400-632c-4d48-a8ad-7e702b26d49d','9f96c58b-8753-4732-a0d4-05477a9a39f5','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124'),
     ('06cc2cbf-62d0-4f47-b567-6e369ee89fd8','5da4cb5d-bea9-4409-b3ce-004a48ccf763','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('01ca80f9-a5db-4765-b687-fdbfcc550038','edf26d44-e2df-4bae-aae9-cfbf5bd37a35','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124'),
     ('ed4e62c3-ce69-42c8-b2c9-980218cbe184','564e84c3-0791-432c-9dd1-f5f41da54861','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124'),
     ('fbee1b0a-387f-4f1c-bf0c-b3195276e403','498aa683-e4fa-45dc-b265-56b002414598','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124'),
     ('ddf05cd1-1f48-4e36-8352-276301afd33f','62b2f8bd-de13-47d5-ae67-405e5305ead2','6715d2ca-8feb-4da9-98d8-fbf623baf61e','2024-02-01 12:55:03.567124'),
     ('0296ed36-0a11-432f-8d2a-386031885d91','783a5a8a-d439-487d-a190-6a2fc5903553','73948a9b-6ccc-4e29-a9e8-a28025b22518','2024-02-06 10:18:54.816646'),
     ('d2d21e24-16d3-4a37-9e76-692a87d6ba8e','4fa7b45c-d365-4d3a-86ad-9f18573a5512','73948a9b-6ccc-4e29-a9e8-a28025b22518','2024-02-06 10:18:54.816646'),
     ('2201a2fa-1c95-4fd7-914d-0c5407b1682f','47df138d-c714-4344-844f-858d9307f5f3','73948a9b-6ccc-4e29-a9e8-a28025b22518','2024-02-06 10:18:54.816646'),
     ('cb09f27d-914f-4b67-9097-afc11691f8f4','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','73948a9b-6ccc-4e29-a9e8-a28025b22518','2024-02-06 10:18:54.816646'),
     ('27bc54b2-3999-421f-96c2-8bd88bdcfec9','d9514ea9-a38d-4d4e-a448-08e195b083fb','73948a9b-6ccc-4e29-a9e8-a28025b22518','2024-02-06 10:18:54.816646'),
     ('7c11a293-360c-47d1-ba73-72c60008ada1','0f9ce201-dbb0-4dd2-9854-2707e6b40201','480047b2-083e-4e9d-bf62-b818a08ea580','2024-02-05 15:10:58.772221');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('27fbb614-2dfb-40c7-8f4b-cd3e5be45177','1273e758-dc43-4173-9ded-49966af829d0','480047b2-083e-4e9d-bf62-b818a08ea580','2024-02-05 15:10:58.772221'),
     ('b3eff64d-27a7-4edd-b12f-ae4c590a57cb','d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('5b425328-23d3-405d-8d49-5386bdc5f259','80f0d83a-2e2d-46c0-a2cf-e90950b22d15','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('69878e22-b071-422b-bc7b-1bf866915dc4','a3a3166e-1e81-4527-b545-c90ca0c6366a','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('0f756556-80fd-44b8-803c-8eed3a311f55','6e0a9e64-cfec-4afa-aa19-839412112cdf','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('f4444f3a-dfc5-49a1-a6d5-13c0417b4f5a','bec4c6f8-8b05-479d-b0c8-916556329916','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('a4629420-77d2-451b-b2c1-db3598d41b91','52e416ed-2057-4bdf-b581-69fc64419d5d','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('fa8584dc-a968-4e56-b121-827a6469534e','e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','ec08250d-1710-4a12-a53d-140800047d5d','2024-02-03 13:21:43.476932'),
     ('cc6d457c-4587-4c53-914d-b754fa02bc23','ba4af011-5baa-4346-a9cb-391a14138991','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737'),
     ('fa45b63f-4731-4a17-9f4c-b90966e55d4b','e16633b3-55b9-4acb-9e36-e3b3551c5be8','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c83aef42-f88f-4f56-9f97-0ae3234b28da','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737'),
     ('d4f3dd60-b1ec-4731-9458-b11302b35a37','b9ba13f8-222f-4786-8c27-c237b134cc55','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737'),
     ('b093aa39-13d2-4c75-915b-9d137eaa9750','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737'),
     ('3dfe21e2-3104-4a4d-90bb-52c1d59ddc19','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','c3b47f06-f407-4111-b207-a3492eba1fd1','2024-02-04 14:33:22.930737'),
     ('17b16b1e-762d-4a27-b5a1-5bd776c46f93','40986a1a-9949-43af-833f-8e3f007b1bfa','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705'),
     ('852998e3-572f-4f85-8e29-bad0f97aba33','783a5a8a-d439-487d-a190-6a2fc5903553','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705'),
     ('6d4f29a1-abd9-45ee-ad69-4c0d606a62a3','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705'),
     ('aeb17d18-6f35-43ca-97b3-f8238e34209b','564e84c3-0791-432c-9dd1-f5f41da54861','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705'),
     ('9b6d4a26-63ae-4c83-b434-80686eab15d8','9cc8a6ab-714a-4af9-b166-5811303c9708','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705'),
     ('7cafccf0-cdbf-457a-bd23-36880b6f9034','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','3e89da98-5792-43fe-b944-63356546d4b9','2024-02-06 11:55:03.672705');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('13ad8fe5-c15e-443e-99cd-8c067d3505ca','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('67b411f4-8712-4942-b602-4bd7b25b4e9b','a7d95827-e81a-45f3-b863-d5242c170545','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('9f7d3283-ce14-4489-a1e1-48dc7eb8a4ce','ac38f34b-99d1-4a4d-acb8-738b299fb79c','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('911cb4b0-552d-4af3-8048-726d29f3378a','944c1df7-83fc-4e02-acfa-a051247ccb7b','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('2b7dfa24-5561-46b1-b60d-6328e1e94c2e','5466a968-f9c8-477f-b7f0-f3adb1e55470','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('7842b225-f045-44a1-adf5-611ac3a6e98d','bd7f32f4-590c-4d1d-ac70-8bb04f481329','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('cc70e556-4927-441a-9f00-3ccb2b642d73','5cc0a92e-9ba2-4833-9cb8-25f48730e7d3','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('f498ca93-9b43-418c-a5a9-aa886bed0456','241ed246-259d-4da6-bdb0-8746da664587','b852c841-4b12-47a7-85c0-29a48d54a49f','2024-02-04 12:28:12.669051'),
     ('991e79f4-0a09-4837-b0bd-a828480ce5b6','e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','86cecfe3-207b-4c85-8adb-c0acdcbedd7c','2024-02-05 14:11:17.850143'),
     ('d71044fa-af47-406d-b5c3-e0c3a7ac0c59','7c980fde-0868-4ac0-92e3-330db7529b74','86cecfe3-207b-4c85-8adb-c0acdcbedd7c','2024-02-05 14:11:17.850143');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c28d8eb4-cf67-47b8-a176-a59c95355ba6','0f9ccfc0-8809-4918-b688-3326d7510e2c','86cecfe3-207b-4c85-8adb-c0acdcbedd7c','2024-02-05 14:11:17.850143'),
     ('837390d7-948d-4029-b512-ae5451082b3b','48ec44ba-9413-46cd-92d1-866f58092166','86cecfe3-207b-4c85-8adb-c0acdcbedd7c','2024-02-05 14:11:17.850143'),
     ('36c604c5-ca28-4f54-a4a5-2d057636c95d','934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','86cecfe3-207b-4c85-8adb-c0acdcbedd7c','2024-02-05 14:11:17.850143'),
     ('42824db4-c5a6-475b-8095-5b0745c3996a','03f52765-4e12-454a-9e79-d8b8be7d7928','8a7a1504-0189-4775-a23b-9fa0d7d83468','2024-02-08 12:01:42.89241'),
     ('1d3af205-3e4c-4e71-8487-002c16189861','0f9ce201-dbb0-4dd2-9854-2707e6b40201','8a7a1504-0189-4775-a23b-9fa0d7d83468','2024-02-08 12:01:42.89241'),
     ('06ee927c-6fd5-4794-9b04-b94d9be51114','9f7c1428-0df3-48c5-a187-d33d6ac03006','8a7a1504-0189-4775-a23b-9fa0d7d83468','2024-02-08 12:01:42.89241'),
     ('f5b4b191-e15e-4cc2-9e7d-8d2624c33810','06332dcf-95ae-4268-be24-c4496f1913f0','8a7a1504-0189-4775-a23b-9fa0d7d83468','2024-02-08 12:01:42.89241'),
     ('2234e971-1c07-4920-968b-750b2a78729c','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','8a7a1504-0189-4775-a23b-9fa0d7d83468','2024-02-08 12:01:42.89241'),
     ('af983d3b-e89d-4897-b567-a982d9ec5236','560191fc-18f7-4962-ae5e-f3f1df01bd02','93634841-3be1-496f-af5b-48b7c53b2482','2024-02-05 13:23:35.587001'),
     ('e3d3c14e-344e-4503-8b3c-648aad5bf6a7','1273e758-dc43-4173-9ded-49966af829d0','93634841-3be1-496f-af5b-48b7c53b2482','2024-02-05 13:23:35.587001');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('bec562b7-87b1-4fbf-994a-1cd044072d79','afb07919-382b-4ac2-8ca2-5e5b04445840','93634841-3be1-496f-af5b-48b7c53b2482','2024-02-05 13:23:35.587001'),
     ('b0d7b01f-aa37-42fa-8743-b6db03f1bd3c','fae9d942-de16-48d5-8e27-3c271e6071f6','93634841-3be1-496f-af5b-48b7c53b2482','2024-02-05 13:23:35.587001'),
     ('32845abd-fe03-4f14-b38f-fd17d4dc0e25','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','2024-02-01 14:41:11.473662'),
     ('ff7f1424-9274-42b5-805c-2b2282ef39fe','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','2024-02-01 14:41:11.473662'),
     ('0faa5ddd-ae3e-4098-b60d-ddfe587ace9e','7c581969-99db-40f8-b4d1-f8b0a244cc2f','f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','2024-02-01 14:41:11.473662'),
     ('01c634f5-325c-4072-a077-4feab02df1b0','ba4af011-5baa-4346-a9cb-391a14138991','f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','2024-02-01 14:41:11.473662'),
     ('07c68770-7851-438d-a70d-207b28d5fe81','40986a1a-9949-43af-833f-8e3f007b1bfa','f0aebb9a-c3d4-44d1-b5a2-4ebc0d29aaa4','2024-02-01 14:41:11.473662'),
     ('7fdf3d26-64aa-4172-a959-7bf3358bf77c','73b5e884-070d-4c2a-b272-08c8fd05e44f','1f75bb82-c177-444b-9ddc-97eaa9727568','2024-02-01 15:21:47.572839'),
     ('947e7059-2fc2-44d4-9e61-9b8aa3949994','6e0a9e64-cfec-4afa-aa19-839412112cdf','1f75bb82-c177-444b-9ddc-97eaa9727568','2024-02-01 15:21:47.572839'),
     ('26355431-2ec9-4459-8ab3-768bec46220f','a05eef2f-5eec-4520-b647-98a890495b67','1f75bb82-c177-444b-9ddc-97eaa9727568','2024-02-01 15:21:47.572839');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('3de84499-a866-4b85-a2b7-d6ea1602cb4d','13dafda4-726b-4318-b683-816ba41cc201','1f75bb82-c177-444b-9ddc-97eaa9727568','2024-02-01 15:21:47.572839'),
     ('21c0c8f5-ea12-4966-ac0b-cf5ccf12cffa','7fb796f0-26a3-44e6-adf1-98f2f54e694b','1f75bb82-c177-444b-9ddc-97eaa9727568','2024-02-01 15:21:47.572839'),
     ('eb504a07-ed49-4a8d-b228-f2e35578a814','b4d0e92e-f607-4f07-b8f8-fb0985775292','14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','2024-02-04 14:37:33.014764'),
     ('1e8dc673-543e-4528-9e54-c22563fcd9f9','498aa683-e4fa-45dc-b265-56b002414598','14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','2024-02-04 14:37:33.014764'),
     ('991fa071-0e93-4092-98e5-f10ef8c4de85','18883ccb-71e0-4af7-ae0f-4be8a69472c1','14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','2024-02-04 14:37:33.014764'),
     ('5082db60-8bee-49d6-b4dc-a1350495f396','ba4af011-5baa-4346-a9cb-391a14138991','14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','2024-02-04 14:37:33.014764'),
     ('587188ab-f440-4302-94bf-1914eda31191','a4025bc1-6871-4549-8f48-7cb0988a49ea','14b5b6d9-8e2c-4ac9-8f5a-09b45d82b8c0','2024-02-04 14:37:33.014764'),
     ('d3056c05-efe0-48c7-9f55-341087933094','bd7f32f4-590c-4d1d-ac70-8bb04f481329','b4344ebf-cc44-4caa-a6d9-97a15b7b737f','2024-02-02 12:33:42.13597'),
     ('ab2bd63f-b889-46d2-8aec-1e8adc14a36c','4ba65332-3c44-4143-a34b-253073c73578','b4344ebf-cc44-4caa-a6d9-97a15b7b737f','2024-02-02 12:33:42.13597'),
     ('7c376288-e741-431c-8df8-48d3ab1560df','47df138d-c714-4344-844f-858d9307f5f3','b4344ebf-cc44-4caa-a6d9-97a15b7b737f','2024-02-02 12:33:42.13597');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('7a47c081-8dbb-46ec-8504-9a6fc5c501d6','1273e758-dc43-4173-9ded-49966af829d0','b4344ebf-cc44-4caa-a6d9-97a15b7b737f','2024-02-02 12:33:42.13597'),
     ('06e6b80d-bb7d-4f5f-a6e5-559c11149bdb','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('be546d19-9763-429a-874d-529e4cf82014','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('19a9c9a2-4455-4535-9dd7-ef9fb93d5722','5da4cb5d-bea9-4409-b3ce-004a48ccf763','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('3e2690c9-8656-469b-beb4-1eb93626f4e6','9b86ac80-e2cb-45c3-900a-bc9d6692f9e1','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('c5a58d6a-914b-468e-9bc3-e25767fc2003','69f29151-e648-4689-88e6-1ceaed25a7af','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('3aec7d5e-53f9-4eb9-831f-885a77ca9ae8','57cecd71-4967-4aa1-81b0-2d5b89f08692','3f255aad-dd56-4d1a-ac01-98d7d5be17f4','2024-02-05 09:12:15.720895'),
     ('74c06d7b-13d0-4759-9cbc-344f2c3c9026','ff5da20e-719f-4546-9050-b51ce5893289','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('ed6bee3b-aa08-42d1-b29d-fbcc82272871','61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('69ad9a37-3903-4d9f-84c1-369c0552fd25','eed01dfb-2bd1-42fe-8b9f-96666b0e5889','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('389a0bfb-c0f8-4e99-aeb2-f22023a8f904','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('5814bd60-21fc-409c-8493-eb887babf394','4b4ef214-37e5-4968-af8a-983ed8836f3d','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('4345fa91-cf71-477e-8948-eb3bbd67e0a8','8539137f-49e3-43a9-8340-806146c7f27a','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('a941dbaa-c9e4-4f29-b4b3-e1d43a06d3aa','af14befa-6203-459d-ae31-cbd71e8cca0e','faa2925b-be91-4bd4-ab4e-f5a920009081','2024-02-07 13:56:32.825381'),
     ('bd7e2beb-cf68-4a1e-a79e-30800c9325a5','fb1771b0-a925-4a76-bc59-5038b7a1fa31','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248'),
     ('90e82604-f4f8-4d79-bead-874f1bbcee90','560191fc-18f7-4962-ae5e-f3f1df01bd02','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248'),
     ('219c7251-c042-4dc1-adb2-5c80e6b40194','fae9d942-de16-48d5-8e27-3c271e6071f6','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248'),
     ('d2eee1d5-c153-4a1e-b6f1-ed64e254d455','8539137f-49e3-43a9-8340-806146c7f27a','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248'),
     ('e2735cbd-456c-44b9-bc70-71a3db6d78e4','ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248'),
     ('3bcffb92-99af-4ef0-8796-f8ef1f85d9f7','840d0b10-cce9-43d4-b57e-d381193335eb','6b02251c-06e9-4721-93b6-51bb086ed053','2024-02-03 15:15:59.605248');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('d9b27620-7b43-4a37-95ad-9c3561235bb2','72a4f385-4733-447c-9900-7cf624110fde','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('9291246d-38af-41c2-8d88-c22a005ceee1','37bc394a-7d32-49ea-b123-16e9de728b62','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('83aee36b-fbfb-492b-b489-e1d05cbe5952','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('19157cea-17df-45d2-9a38-3a72fca4d761','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('85bf33e2-47f4-49d5-82f5-a06f286fdc0c','1f2fedb8-f19e-4865-8216-85f799d8beef','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('eac9c63a-8088-4bea-bab4-6e20e61fc511','1910c4d7-0011-4b2c-ab65-8f3f3895a499','162cc34d-527a-48ed-ba8a-10102d1fd092','2024-02-05 12:08:48.045304'),
     ('f77520ec-8756-4efc-979f-125814482b68','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('cd527076-a87b-4cc3-8287-0f0f20311fb2','13dafda4-726b-4318-b683-816ba41cc201','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('a775099b-3a05-4f75-8f42-ac3ff7baf89f','a5a38c7c-9b7d-45d5-b84f-b2365f7d14c4','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('8ef6103b-16f0-49cc-8ca0-9bbe2e9764fa','1f153562-754c-42cb-950d-9331304561b3','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('bd60d8c8-4e9d-4181-8c0c-68730b7760fd','bf4fa5eb-4819-4034-b5b8-d172cb1c7b8c','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('788aa69b-d27a-4644-836a-7340ed2a6de2','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('0753709c-d347-4194-871f-2e25d74e019a','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','437fecbe-5492-45b2-aa67-0fff0a3ba885','2024-02-01 13:06:17.697367'),
     ('47122e22-e66d-4721-8dbb-758888031d90','9cc8a6ab-714a-4af9-b166-5811303c9708','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('62c88b3d-83cf-4520-ad87-4b0aea8211fe','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('c266e3a5-8df5-4a90-8831-67320b6c3999','4fa7b45c-d365-4d3a-86ad-9f18573a5512','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('70585d7e-5fa4-46d4-9aff-08838f2430b1','560191fc-18f7-4962-ae5e-f3f1df01bd02','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('08558e73-645a-4e99-b629-8942df08424f','04197ba3-83ff-4ccb-8344-c416866cdce3','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('c8914d85-1203-4e8d-86b4-6f2765fd517a','e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','07115e6a-f1dc-4176-8fbf-dc6a9a4f74ce','2024-02-07 12:56:20.139701'),
     ('f3a5da33-a440-45e7-be9b-d89f41d2e086','7c980fde-0868-4ac0-92e3-330db7529b74','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('52eb9bb2-0583-4ca8-ac72-57f1e74c474f','72209775-0fa0-422a-91ca-8f141731508e','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741'),
     ('362b210a-6beb-4ea7-bb06-41f73956975f','76fed48b-5c6b-4e36-b58c-300918f2fc7f','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741'),
     ('0637a60a-365e-4aa8-b89a-2be5c91f7cc1','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741'),
     ('0298e6e2-113c-4164-8ec8-26ad7559a393','724b55b5-650f-4526-aeba-df3d907b7ad5','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741'),
     ('66d6f2fe-d846-4df9-b656-2ae899c61350','a162d19b-bd43-4e3a-b989-fbc37b0d2b83','ae156d32-7897-4b01-957a-051d844fc037','2024-02-03 15:12:47.267741'),
     ('09f9eb62-e1cb-4aa5-889a-3c5f916bfb4b','bd7f32f4-590c-4d1d-ac70-8bb04f481329','e0f1b5f7-0240-4ea1-ba80-01c976bab478','2024-02-03 12:57:15.28996'),
     ('15817832-0f91-4c6c-be6a-4410ac278d57','e9110b99-b085-4070-b27d-901aeb8ddafb','e0f1b5f7-0240-4ea1-ba80-01c976bab478','2024-02-03 12:57:15.28996'),
     ('570d9db5-3dc9-437a-a9ef-81937f83b651','a5a38c7c-9b7d-45d5-b84f-b2365f7d14c4','e0f1b5f7-0240-4ea1-ba80-01c976bab478','2024-02-03 12:57:15.28996'),
     ('c7b426c0-1190-4af7-8645-8bd9c3f23ff6','7a8a6302-d49a-4dec-b1be-858c8cc1c2aa','e0f1b5f7-0240-4ea1-ba80-01c976bab478','2024-02-03 12:57:15.28996'),
     ('3ba85ae1-7f98-412d-93f9-00546fc09236','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('9b7d9fdb-c844-4fbc-b3d5-d296f5d00d02','d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477'),
     ('3189c49a-acf5-4dfc-b95b-ffdc0dad2621','f2c128c7-3e4b-404d-b824-fddfc44d4c72','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477'),
     ('42ba53c2-cb59-434f-97c8-5df8862810b1','4c70dbd1-12d1-46e2-8112-b6d9848844de','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477'),
     ('0608c337-12c3-4595-a8a6-1b190e752393','fb1771b0-a925-4a76-bc59-5038b7a1fa31','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477'),
     ('54fb9a21-3cd2-491a-a45e-7bafa6d9f6b1','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','9d0e3413-cc9a-483f-910c-9c7b8eb9b192','2024-02-06 11:45:54.661477'),
     ('c8b5bce2-a96e-4d9f-a097-16dbc3fdc91b','72a4f385-4733-447c-9900-7cf624110fde','677ec247-0202-4a25-881c-ae83aeb50d30','2024-02-06 14:17:47.559069'),
     ('de7e46f1-b7c2-4177-9599-e70b00be85a6','e16633b3-55b9-4acb-9e36-e3b3551c5be8','677ec247-0202-4a25-881c-ae83aeb50d30','2024-02-06 14:17:47.559069'),
     ('e5d53dc8-89e6-4be8-bdac-af45c29e6ca8','57220801-cfd2-409d-9efc-16f5c55ec521','677ec247-0202-4a25-881c-ae83aeb50d30','2024-02-06 14:17:47.559069'),
     ('d1c08c2a-8ebc-493b-b139-79163ba01e7e','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','677ec247-0202-4a25-881c-ae83aeb50d30','2024-02-06 14:17:47.559069'),
     ('a1adcd85-1f9d-4999-b221-1de03268359a','115a528e-042b-4055-bc97-ba7a1b5dc412','677ec247-0202-4a25-881c-ae83aeb50d30','2024-02-06 14:17:47.559069');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('f92f49a5-b5df-48a4-84aa-d1c435d56749','62b2f8bd-de13-47d5-ae67-405e5305ead2','917ac8dc-35bb-4f7a-aa33-268ceb69e969','2024-02-01 10:17:36.421616'),
     ('216e9243-9c5d-43aa-8c9d-538677111d4a','03f52765-4e12-454a-9e79-d8b8be7d7928','917ac8dc-35bb-4f7a-aa33-268ceb69e969','2024-02-01 10:17:36.421616'),
     ('af09247b-c863-4777-a716-bf47a86cbfe5','386e6f19-ff6e-48be-954e-f9dfa51b5b80','917ac8dc-35bb-4f7a-aa33-268ceb69e969','2024-02-01 10:17:36.421616'),
     ('7336c816-7c88-43cd-9167-5d49ac3d0223','9231e3ad-6b2e-4fce-810e-963b45adeb84','917ac8dc-35bb-4f7a-aa33-268ceb69e969','2024-02-01 10:17:36.421616'),
     ('2e581dbc-45a1-4f86-9c41-570c81cff0e1','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','917ac8dc-35bb-4f7a-aa33-268ceb69e969','2024-02-01 10:17:36.421616'),
     ('7d02d94a-cbeb-4b5a-8e45-c58a2990bc5d','d53d6ec8-b106-448e-ad64-8664daa53a51','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229'),
     ('c9ec0bbd-0765-4c41-b874-97770bc8ee3a','9f7c1428-0df3-48c5-a187-d33d6ac03006','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229'),
     ('b607155f-cd6c-4051-a79f-7591274413f0','72209775-0fa0-422a-91ca-8f141731508e','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229'),
     ('357b63eb-2272-4276-9e3a-653ff996841c','bec4c6f8-8b05-479d-b0c8-916556329916','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229'),
     ('73740b77-e161-47d2-aa63-a89f74d52de3','e16633b3-55b9-4acb-9e36-e3b3551c5be8','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('b1aac4df-0eca-4bf8-ae10-9c6b04cca329','0f9ccfc0-8809-4918-b688-3326d7510e2c','0f795b3f-d591-4938-bc5e-7ad622ef5ad4','2024-02-03 13:36:38.896229'),
     ('570f0deb-5cd4-455d-9cea-a844b6050e65','af14befa-6203-459d-ae31-cbd71e8cca0e','25e9b1cb-73cb-4e99-bdaa-44dfbfc74425','2024-02-06 14:15:54.756485'),
     ('38c68634-93d7-420e-824a-7bf14601db93','ac92b131-1eee-43b9-9c53-709aaad81ae5','25e9b1cb-73cb-4e99-bdaa-44dfbfc74425','2024-02-06 14:15:54.756485'),
     ('6a6a4a11-2642-4f8d-8bae-b396ddf1fb1e','5da4cb5d-bea9-4409-b3ce-004a48ccf763','25e9b1cb-73cb-4e99-bdaa-44dfbfc74425','2024-02-06 14:15:54.756485'),
     ('2a5746a3-889d-4041-b6a7-1aac082ec4e7','840d0b10-cce9-43d4-b57e-d381193335eb','25e9b1cb-73cb-4e99-bdaa-44dfbfc74425','2024-02-06 14:15:54.756485'),
     ('dd974758-51df-4ff1-acef-a0d7c615d560','2b8b6da1-7f3a-48f8-ae0e-e2f77b4d2179','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835'),
     ('8d3186d5-9c49-492f-8ffd-8f50b9655d42','16e56781-09b6-4271-9fac-ade178214849','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835'),
     ('0df7018b-ed0a-444b-8ae6-14cab4767abb','2fa71b2a-82f9-4f4a-99e5-5b513361957e','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835'),
     ('ff435919-3ae6-4d13-b774-4e30235bd296','af14befa-6203-459d-ae31-cbd71e8cca0e','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835'),
     ('8b2f839a-4f50-41c6-a4e4-fb2582b00f05','837b194c-d0ff-406b-ad3e-c0a499451ca0','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('dac50ad7-d29f-4722-9ada-053ece8224de','9f7c1428-0df3-48c5-a187-d33d6ac03006','f7b78a24-17b3-4cef-8a4c-7adf76483ec4','2024-02-06 14:53:45.781835'),
     ('8d2ad6fc-8719-418e-9b1f-1c91c23b344c','a3a3166e-1e81-4527-b545-c90ca0c6366a','508901e1-0b37-4460-bf35-626e13194c2d','2024-02-06 14:01:52.864101'),
     ('aa95ce51-95b6-4269-91f1-7269e12b8a31','0f9ce201-dbb0-4dd2-9854-2707e6b40201','508901e1-0b37-4460-bf35-626e13194c2d','2024-02-06 14:01:52.864101'),
     ('5ce1afb3-f48a-4039-90fa-14d40d082c5e','783a5a8a-d439-487d-a190-6a2fc5903553','508901e1-0b37-4460-bf35-626e13194c2d','2024-02-06 14:01:52.864101'),
     ('e4b4f2a0-00fe-4feb-966a-59c0d6e6c3b9','ba4af011-5baa-4346-a9cb-391a14138991','b9ed249a-9403-46fb-bd51-3b00805fbb1c','2024-02-06 15:13:11.80454'),
     ('61a56d10-42b8-4205-ad36-c8cf3cdddc21','67fa4c58-4422-4002-a717-f54b45a687f7','b9ed249a-9403-46fb-bd51-3b00805fbb1c','2024-02-06 15:13:11.80454'),
     ('edaf3aae-35ef-4e2d-8ee3-074bb63862d3','bec4c6f8-8b05-479d-b0c8-916556329916','b9ed249a-9403-46fb-bd51-3b00805fbb1c','2024-02-06 15:13:11.80454'),
     ('dd37839f-5e3c-4ca9-963c-b5b904622b05','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','b9ed249a-9403-46fb-bd51-3b00805fbb1c','2024-02-06 15:13:11.80454'),
     ('8e63636c-1e9d-49d8-9e7a-b8831e7dafd1','61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','b9ed249a-9403-46fb-bd51-3b00805fbb1c','2024-02-06 15:13:11.80454'),
     ('996f64ae-7a62-4344-9494-6ca89e2ff64e','1273e758-dc43-4173-9ded-49966af829d0','5063c72e-4ea1-4af2-ab70-8986a3e6e554','2024-02-01 11:51:23.45001');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('8bd681ad-aba5-4088-a9ce-092a2523969b','3d016b73-5721-46a0-aded-c522e70c61b8','5063c72e-4ea1-4af2-ab70-8986a3e6e554','2024-02-01 11:51:23.45001'),
     ('f020b231-a1be-41ab-b283-b929b6324699','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','5063c72e-4ea1-4af2-ab70-8986a3e6e554','2024-02-01 11:51:23.45001'),
     ('f078039c-89c4-4927-a359-c95e4779e7ed','2fa71b2a-82f9-4f4a-99e5-5b513361957e','5063c72e-4ea1-4af2-ab70-8986a3e6e554','2024-02-01 11:51:23.45001'),
     ('3cc16344-4249-4155-9d34-1a1df59be1b0','06332dcf-95ae-4268-be24-c4496f1913f0','5063c72e-4ea1-4af2-ab70-8986a3e6e554','2024-02-01 11:51:23.45001'),
     ('213dee66-4bd4-4c29-8c47-9b4c917b5844','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','c8abeece-239e-4595-a82f-9e483a7698b3','2024-02-07 17:56:05.512666'),
     ('2a9d318a-1d85-46a1-8ffa-9c4cae70027c','ac92b131-1eee-43b9-9c53-709aaad81ae5','c8abeece-239e-4595-a82f-9e483a7698b3','2024-02-07 17:56:05.512666'),
     ('f1d855bc-aa82-4af3-95b5-247972d346ca','a7d95827-e81a-45f3-b863-d5242c170545','c8abeece-239e-4595-a82f-9e483a7698b3','2024-02-07 17:56:05.512666'),
     ('a8e69c15-faf4-43fd-846a-56c161d82be1','9d40faa9-3695-43d6-a19c-4dc329edb8f4','c8abeece-239e-4595-a82f-9e483a7698b3','2024-02-07 17:56:05.512666'),
     ('3f882f1a-aa6f-49b7-bb0f-14e61916e316','f2c128c7-3e4b-404d-b824-fddfc44d4c72','19fe04db-6226-4784-bdd5-f75a438ee4a9','2024-02-03 16:11:31.242594'),
     ('4919f89f-7141-496a-8520-17473692cfc7','fb4a06e5-2a31-439a-8935-367670c1e060','19fe04db-6226-4784-bdd5-f75a438ee4a9','2024-02-03 16:11:31.242594');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('1cf59fb3-5630-42e3-a173-10485afa0e8b','72a4f385-4733-447c-9900-7cf624110fde','19fe04db-6226-4784-bdd5-f75a438ee4a9','2024-02-03 16:11:31.242594'),
     ('9ee457a2-b928-468e-b02b-3307dd8d99af','4fa7b45c-d365-4d3a-86ad-9f18573a5512','19fe04db-6226-4784-bdd5-f75a438ee4a9','2024-02-03 16:11:31.242594'),
     ('b0e755cf-71ac-4b8f-87cd-39de6013d819','8e1699ec-8969-409e-ae00-fe9d697edebb','22240407-a33d-4504-9e9d-485f5de7215f','2024-02-02 11:13:06.830352'),
     ('e26c43c5-c8b5-4666-8370-d75f28b7cb28','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','22240407-a33d-4504-9e9d-485f5de7215f','2024-02-02 11:13:06.830352'),
     ('638b9ec8-b881-49f8-8255-b7c118570b5e','0acc5e48-5c5b-4a90-8758-3476bdc751fb','22240407-a33d-4504-9e9d-485f5de7215f','2024-02-02 11:13:06.830352'),
     ('b900b629-face-4203-a1a6-0faa311d84a5','a05eef2f-5eec-4520-b647-98a890495b67','22240407-a33d-4504-9e9d-485f5de7215f','2024-02-02 11:13:06.830352'),
     ('9143bc16-8f53-492f-a80e-fdecfb5b5c32','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','22240407-a33d-4504-9e9d-485f5de7215f','2024-02-02 11:13:06.830352'),
     ('90ded61e-8784-428a-beb1-bda3c6bc0109','62b2f8bd-de13-47d5-ae67-405e5305ead2','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074'),
     ('4392dbf3-5e31-4bd4-b1b3-27fd3f9ecff1','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074'),
     ('361edc1d-7619-44a4-b6cd-15f6c6e0127b','72a4f385-4733-447c-9900-7cf624110fde','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('0560a78e-f88b-465b-b6c1-378ba96624d5','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074'),
     ('fe79f827-2a13-4879-a556-c1ca64278436','9d40faa9-3695-43d6-a19c-4dc329edb8f4','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074'),
     ('74ad9f1d-eefc-406a-8c10-4c470d0ecccb','3d016b73-5721-46a0-aded-c522e70c61b8','a9bd9a50-ea7b-4d8f-a54f-2398b2f023cc','2024-02-05 14:35:23.613074'),
     ('e03fbd3b-c8f7-464b-ba7f-fdd0417d86de','06332dcf-95ae-4268-be24-c4496f1913f0','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('e601dea5-a1b2-4cdf-b181-b11095f77706','67fa4c58-4422-4002-a717-f54b45a687f7','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('4d4a6a01-51a0-41b4-bef6-c6e87b4f4973','4fa7b45c-d365-4d3a-86ad-9f18573a5512','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('19bcb5fd-686d-496e-a0a9-aa1ef3925fd0','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('12a4236b-5bc1-418e-a9e7-f762c50ecee2','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('c6db1e8f-b280-496b-bb63-e31e3d17d34b','37bc394a-7d32-49ea-b123-16e9de728b62','80ead4d6-3418-4d31-81f6-7a5ea4f10da9','2024-02-03 16:09:37.35605'),
     ('efbadeeb-bd32-4a3b-abac-9599e7ddd5d7','8c7e578b-4918-4e36-91d0-d77edd73a470','c66f3574-a71d-49b9-84af-525b3344088d','2024-02-01 12:38:48.305257');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('2fb1fe9d-3ef0-43bd-b9f3-d62315598195','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','c66f3574-a71d-49b9-84af-525b3344088d','2024-02-01 12:38:48.305257'),
     ('790d737c-ce3b-47dd-8c87-28dcc2d7204f','2fa71b2a-82f9-4f4a-99e5-5b513361957e','c66f3574-a71d-49b9-84af-525b3344088d','2024-02-01 12:38:48.305257'),
     ('0049cade-1b04-4d8d-bf59-209c8523a0c4','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','c66f3574-a71d-49b9-84af-525b3344088d','2024-02-01 12:38:48.305257'),
     ('fba92231-169a-46c5-aac1-8d6ccd4110d9','724b55b5-650f-4526-aeba-df3d907b7ad5','c66f3574-a71d-49b9-84af-525b3344088d','2024-02-01 12:38:48.305257'),
     ('94c5ca46-f482-4873-baf6-ac45d1b10bf6','57cecd71-4967-4aa1-81b0-2d5b89f08692','e19bed36-3ba0-4ed7-9929-0a72a15eac05','2024-02-02 14:52:25.862779'),
     ('ff692a3b-9403-4c5a-8825-3a86a98fc0c8','4ba65332-3c44-4143-a34b-253073c73578','e19bed36-3ba0-4ed7-9929-0a72a15eac05','2024-02-02 14:52:25.862779'),
     ('78d56ce9-0a9d-4747-ad6b-24c11364c19c','7c980fde-0868-4ac0-92e3-330db7529b74','e19bed36-3ba0-4ed7-9929-0a72a15eac05','2024-02-02 14:52:25.862779'),
     ('b631574f-9a43-40cb-96eb-e69679e7c6c6','bd7f32f4-590c-4d1d-ac70-8bb04f481329','e19bed36-3ba0-4ed7-9929-0a72a15eac05','2024-02-02 14:52:25.862779'),
     ('8b7f57d1-0266-4a62-8433-ef9e76c5165f','0c718674-7871-4988-8746-3b40027ac3b1','56792bb3-72f2-4682-be67-c385f1928232','2024-02-04 13:18:20.064467'),
     ('7759b53a-ec30-4acc-b468-f2d979e6bbbb','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','56792bb3-72f2-4682-be67-c385f1928232','2024-02-04 13:18:20.064467');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('4828759f-880a-4ed7-be0a-cb9962178479','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','56792bb3-72f2-4682-be67-c385f1928232','2024-02-04 13:18:20.064467'),
     ('c1952f5b-8faa-44c6-87a8-223c8281cd21','8539137f-49e3-43a9-8340-806146c7f27a','56792bb3-72f2-4682-be67-c385f1928232','2024-02-04 13:18:20.064467'),
     ('b9431cbf-2488-4490-ad28-3a50152b9a4e','d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','56792bb3-72f2-4682-be67-c385f1928232','2024-02-04 13:18:20.064467'),
     ('88446af2-6739-4aef-8f34-f2c4551b6c73','ac38f34b-99d1-4a4d-acb8-738b299fb79c','eda17f88-54d5-4584-9b63-4e92efe1633e','2024-02-02 14:11:32.013185'),
     ('21d436af-df5a-4e77-98a2-2be663a0d5c6','b4d0e92e-f607-4f07-b8f8-fb0985775292','eda17f88-54d5-4584-9b63-4e92efe1633e','2024-02-02 14:11:32.013185'),
     ('d1914b59-2311-4a4b-a5a2-f366ade76450','498aa683-e4fa-45dc-b265-56b002414598','eda17f88-54d5-4584-9b63-4e92efe1633e','2024-02-02 14:11:32.013185'),
     ('b93d76a5-1633-4130-8d75-3f5660e985b8','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','eda17f88-54d5-4584-9b63-4e92efe1633e','2024-02-02 14:11:32.013185'),
     ('f8d4546b-c061-4938-8bf8-c0f5d6f86fa1','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','eda17f88-54d5-4584-9b63-4e92efe1633e','2024-02-02 14:11:32.013185'),
     ('c0e94404-4a47-4114-a156-9bfa7efeb83f','5e17d1ff-5cd1-4736-a123-635b36225eea','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892'),
     ('8ba7e7b5-1f0b-45ec-b427-540ffadc8f30','0797bfbf-9574-4264-9187-548f22b108a3','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('cb1cb45e-5a84-4ffa-a1d8-0663690d68f5','8e1699ec-8969-409e-ae00-fe9d697edebb','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892'),
     ('b23066c0-0528-4f22-aa99-5c14c04c3c48','2fa71b2a-82f9-4f4a-99e5-5b513361957e','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892'),
     ('ec279285-9837-42c2-8683-fd0d7d301653','1273e758-dc43-4173-9ded-49966af829d0','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892'),
     ('04e42697-9cc1-49f8-9735-04915a6034ba','498aa683-e4fa-45dc-b265-56b002414598','fadb6e40-5127-4546-bc1c-0e1b43553360','2024-02-02 13:33:55.045892'),
     ('ccb1c7f6-51cb-4f0b-af3c-f62f5ac33c24','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117'),
     ('a9b3f744-2426-4ec1-9cb3-f512d7160729','03f52765-4e12-454a-9e79-d8b8be7d7928','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117'),
     ('26597bf6-21d0-4bb5-8794-c35205fe122d','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117'),
     ('60286d99-39cc-477c-9c28-ab158063bcbf','7c749acd-4feb-4a93-8339-13d9d3c42196','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117'),
     ('19897c8d-ed3e-4ca7-a8e9-ea358890b59a','783a5a8a-d439-487d-a190-6a2fc5903553','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117'),
     ('cd819be4-821e-4ff6-bef8-8997a15e8b19','79dbd01d-717c-483a-9797-bfa1aee8707f','ee640787-ac7c-4c9c-a3a2-701cc9478ff5','2024-02-05 17:13:05.406117');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('6c8eccd3-90ea-41e1-ab8f-f486bd3cfe0f','16e9371d-0c20-47cd-b28a-0f9f34971dde','df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','2024-02-04 14:41:22.176301'),
     ('076a110c-6ea3-4b97-a472-68b9291e88b9','414343ae-bf9c-41a8-a79f-126804314ea6','df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','2024-02-04 14:41:22.176301'),
     ('7e4603ad-46b2-469b-8324-9905cc9b00f4','b4d0e92e-f607-4f07-b8f8-fb0985775292','df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','2024-02-04 14:41:22.176301'),
     ('ff2b901e-e44c-4f44-9746-cc22f9d8ebe9','ce1f6aba-e753-4693-905a-9c2efd7580bd','df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','2024-02-04 14:41:22.176301'),
     ('ae30426d-bac1-4675-a7ef-a2d4718dee89','8c7e578b-4918-4e36-91d0-d77edd73a470','df99a7a9-6f2d-4f28-ae74-7b9d20719ecc','2024-02-04 14:41:22.176301'),
     ('f7c09898-9c46-4eff-89bd-7dbf96f4c696','f2c128c7-3e4b-404d-b824-fddfc44d4c72','c9cca741-0854-434c-8ba0-ac51ec012e26','2024-02-04 12:10:29.185458'),
     ('243240c0-e7fc-4597-91fd-3a81cb1a9cd3','9cc8a6ab-714a-4af9-b166-5811303c9708','c9cca741-0854-434c-8ba0-ac51ec012e26','2024-02-04 12:10:29.185458'),
     ('2664be4f-faad-4fa0-bf1d-995ee0d4e8a1','ce1f6aba-e753-4693-905a-9c2efd7580bd','c9cca741-0854-434c-8ba0-ac51ec012e26','2024-02-04 12:10:29.185458'),
     ('46e0d126-4847-4f5a-89c8-17ecc6e7f65a','73b5e884-070d-4c2a-b272-08c8fd05e44f','c9cca741-0854-434c-8ba0-ac51ec012e26','2024-02-04 12:10:29.185458'),
     ('48ec474c-d3f9-4f61-8d74-4acf82c5c5ba','c8c4650c-71c8-46ef-b813-f09e063dbc99','3fc128ca-ada1-435a-8fbd-d8071c6a8f84','2024-02-08 12:59:43.919509');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('d32a952c-8878-4df4-810a-c35bc8e7a2aa','1f153562-754c-42cb-950d-9331304561b3','3fc128ca-ada1-435a-8fbd-d8071c6a8f84','2024-02-08 12:59:43.919509'),
     ('3a5328f1-2700-4f75-a055-4c4c22fc648a','52e416ed-2057-4bdf-b581-69fc64419d5d','3fc128ca-ada1-435a-8fbd-d8071c6a8f84','2024-02-08 12:59:43.919509'),
     ('b045be0c-8c35-4184-aa20-56792dc0f2a2','54ef1506-540c-4567-afb9-406ae9d95e34','3fc128ca-ada1-435a-8fbd-d8071c6a8f84','2024-02-08 12:59:43.919509'),
     ('f2b946f3-064d-46f1-b5ff-4cdc4a2b8226','a4025bc1-6871-4549-8f48-7cb0988a49ea','3fc128ca-ada1-435a-8fbd-d8071c6a8f84','2024-02-08 12:59:43.919509'),
     ('a97a4167-0887-45fd-97d2-dab9a8001e97','67fa4c58-4422-4002-a717-f54b45a687f7','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056'),
     ('eeb78e97-2607-4a56-b141-aaf5089aa0ee','e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056'),
     ('5ee98eab-4fee-42c6-bb12-df8370050c76','840d0b10-cce9-43d4-b57e-d381193335eb','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056'),
     ('5647ff64-d1b0-4ca4-b010-c5dbd07fefc6','414343ae-bf9c-41a8-a79f-126804314ea6','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056'),
     ('ba67ceb8-4ef8-40bd-a4f1-fee8fc912719','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056'),
     ('5387dfa6-4558-4a39-b58d-7e649444983f','bea0dc91-7503-47d3-83fb-55a08fc31ead','7bf54ef5-4ecd-4c6b-9e40-f3051cabf554','2024-02-06 11:20:00.499056');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('1c87bdf9-827a-41ff-bdee-b80f9396bc3a','47df138d-c714-4344-844f-858d9307f5f3','f2b71af2-f197-4c81-837b-0ba1f2d02422','2024-02-05 14:24:16.435885'),
     ('0e37d36c-6882-4030-97f8-d3149c3524d9','7d7f447f-d0ef-4ab7-8d45-9990796c9094','f2b71af2-f197-4c81-837b-0ba1f2d02422','2024-02-05 14:24:16.435885'),
     ('2440f8dd-43dc-4461-bdf4-9d24c9f81b88','840d0b10-cce9-43d4-b57e-d381193335eb','f2b71af2-f197-4c81-837b-0ba1f2d02422','2024-02-05 14:24:16.435885'),
     ('946839ab-4953-4a83-98ec-14d818b4d9f6','fae9d942-de16-48d5-8e27-3c271e6071f6','f2b71af2-f197-4c81-837b-0ba1f2d02422','2024-02-05 14:24:16.435885'),
     ('ffe42fb6-a715-4102-8903-04d33214ab99','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','f2b71af2-f197-4c81-837b-0ba1f2d02422','2024-02-05 14:24:16.435885'),
     ('cea5edb4-d951-439a-8655-779fc2a62252','ba4af011-5baa-4346-a9cb-391a14138991','9c3646ad-3808-4416-b106-be44ae6b0ed9','2024-02-06 13:35:26.87274'),
     ('e1644e71-ec06-48fb-8f3d-38a5801a2e88','a05eef2f-5eec-4520-b647-98a890495b67','9c3646ad-3808-4416-b106-be44ae6b0ed9','2024-02-06 13:35:26.87274'),
     ('631ac2ee-6b53-4836-ba22-efbe14c19a52','13dafda4-726b-4318-b683-816ba41cc201','9c3646ad-3808-4416-b106-be44ae6b0ed9','2024-02-06 13:35:26.87274'),
     ('3c4470b2-1b86-4610-87a1-302aab39ad93','0c718674-7871-4988-8746-3b40027ac3b1','9c3646ad-3808-4416-b106-be44ae6b0ed9','2024-02-06 13:35:26.87274'),
     ('7d4d742d-aaee-4e9d-99e7-cb0ae86ff09a','77f1be48-5c6b-44f8-ac52-7a760c7faf9c','b629320f-11cf-4134-96ed-6fb0bd604efc','2024-02-04 11:10:48.673552');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('bcc5229c-c3c0-40b2-b185-03524dabe60f','8c7e578b-4918-4e36-91d0-d77edd73a470','b629320f-11cf-4134-96ed-6fb0bd604efc','2024-02-04 11:10:48.673552'),
     ('cec75cb7-6582-4786-bbe7-c9a9e43603fa','67fa4c58-4422-4002-a717-f54b45a687f7','b629320f-11cf-4134-96ed-6fb0bd604efc','2024-02-04 11:10:48.673552'),
     ('7b9c11e0-8873-49cf-a361-86545781029f','0f9ce201-dbb0-4dd2-9854-2707e6b40201','b629320f-11cf-4134-96ed-6fb0bd604efc','2024-02-04 11:10:48.673552'),
     ('02990678-2d02-4257-8932-d37e44b27111','837b194c-d0ff-406b-ad3e-c0a499451ca0','b629320f-11cf-4134-96ed-6fb0bd604efc','2024-02-04 11:10:48.673552'),
     ('31dcddda-cb1e-4eb0-875a-009a85cc03b7','7d7f447f-d0ef-4ab7-8d45-9990796c9094','40d13d1d-54d9-4f9c-9c8a-a8389d4cd3d6','2024-02-05 14:11:13.750824'),
     ('1e2c65db-8c71-46d0-8b45-5152a9e528aa','bd7f32f4-590c-4d1d-ac70-8bb04f481329','40d13d1d-54d9-4f9c-9c8a-a8389d4cd3d6','2024-02-05 14:11:13.750824'),
     ('4d9bf8fd-04c1-4742-a917-502cb069bdf5','7c581969-99db-40f8-b4d1-f8b0a244cc2f','40d13d1d-54d9-4f9c-9c8a-a8389d4cd3d6','2024-02-05 14:11:13.750824'),
     ('c71ace54-2a74-436c-a4c3-c3f2194d5087','8e1699ec-8969-409e-ae00-fe9d697edebb','40d13d1d-54d9-4f9c-9c8a-a8389d4cd3d6','2024-02-05 14:11:13.750824'),
     ('ad1a2866-e35b-4d19-a721-f183cb878039','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','b4bc5e5d-b047-4163-85b2-04035d554c5b','2024-02-07 15:38:41.294188'),
     ('52e131ae-86dc-4414-bcab-67c6ca82dcb4','fae9d942-de16-48d5-8e27-3c271e6071f6','b4bc5e5d-b047-4163-85b2-04035d554c5b','2024-02-07 15:38:41.294188');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('e84a1212-d6e3-4ae2-82c6-46e7220cb072','4ba65332-3c44-4143-a34b-253073c73578','b4bc5e5d-b047-4163-85b2-04035d554c5b','2024-02-07 15:38:41.294188'),
     ('d165f16d-3e2b-4a05-9492-f93607feaa02','69f29151-e648-4689-88e6-1ceaed25a7af','b4bc5e5d-b047-4163-85b2-04035d554c5b','2024-02-07 15:38:41.294188'),
     ('1f7e39ba-f9cf-41a9-8999-13b196d11cd9','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','50094b7a-69aa-465e-896f-65bcf654a881','2024-02-05 09:53:06.969264'),
     ('f72232ed-d434-4683-996f-2b9d6fc05f49','4ba65332-3c44-4143-a34b-253073c73578','50094b7a-69aa-465e-896f-65bcf654a881','2024-02-05 09:53:06.969264'),
     ('46ea4d79-df79-41ef-aa23-36d90c3f6729','61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','50094b7a-69aa-465e-896f-65bcf654a881','2024-02-05 09:53:06.969264'),
     ('99b919e6-ccc5-48b6-91cb-30448a495348','9b86ac80-e2cb-45c3-900a-bc9d6692f9e1','e4dbceb3-142e-430f-8d97-228392a05697','2024-02-06 10:20:07.624186'),
     ('d1ab6175-9e7b-488b-8f69-d77cc258668c','16e56781-09b6-4271-9fac-ade178214849','e4dbceb3-142e-430f-8d97-228392a05697','2024-02-06 10:20:07.624186'),
     ('b08fa9e1-9d10-43c9-acfa-89c4b03c3726','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','e4dbceb3-142e-430f-8d97-228392a05697','2024-02-06 10:20:07.624186'),
     ('64774a0a-f5bc-4c96-abdf-44745776f639','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','e4dbceb3-142e-430f-8d97-228392a05697','2024-02-06 10:20:07.624186'),
     ('35e422cb-bc65-448b-80d1-418d8943e448','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','194ea130-b85a-4b2d-9814-8964814bb5ae','2024-02-04 10:59:33.619237');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('0853e50e-2e0e-4f42-a14c-ba85bf0ddc5c','e16633b3-55b9-4acb-9e36-e3b3551c5be8','194ea130-b85a-4b2d-9814-8964814bb5ae','2024-02-04 10:59:33.619237'),
     ('4b64d825-e868-4f00-878a-f12990335455','e5d0db67-242a-4b88-b335-ccc0d0af8879','194ea130-b85a-4b2d-9814-8964814bb5ae','2024-02-04 10:59:33.619237'),
     ('00f0ccc8-d239-4515-b941-d1502b06585a','afb07919-382b-4ac2-8ca2-5e5b04445840','194ea130-b85a-4b2d-9814-8964814bb5ae','2024-02-04 10:59:33.619237'),
     ('e1378fe6-fcac-4f51-95a8-95230b9dd4a8','2b8b6da1-7f3a-48f8-ae0e-e2f77b4d2179','194ea130-b85a-4b2d-9814-8964814bb5ae','2024-02-04 10:59:33.619237'),
     ('31d5dcce-df99-4410-b991-e6b16c00d114','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('a38b14e0-d696-41b5-927b-bdee5430ab4b','5e17d1ff-5cd1-4736-a123-635b36225eea','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('dc96e305-1afd-4b72-aa32-a82568cf4308','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('17fed2d3-e63e-487e-be04-0a49f4d87cc3','d53d6ec8-b106-448e-ad64-8664daa53a51','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('a6b47e43-86eb-44c8-bb61-6ca867945999','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('1012b756-a25e-4717-add2-f639a13f5338','b699576a-07af-4fd6-bcc5-6c912630c3a6','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('e2fda9a1-461a-40c2-8e9f-452f93caca7b','72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','99e7df23-2177-443b-af22-3f346acf60fb','2024-02-01 12:47:51.304575'),
     ('96af72b9-3559-4972-8be6-2cbbdb7ca994','72209775-0fa0-422a-91ca-8f141731508e','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('baba0b89-35c1-44aa-b57d-8fb4af10a3ef','7c749acd-4feb-4a93-8339-13d9d3c42196','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('1d165105-2d2d-4d0e-9f67-1ee73aa7f7fe','f2c128c7-3e4b-404d-b824-fddfc44d4c72','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('d358c8fc-6f91-4512-a422-a1332fa9bed6','5da4cb5d-bea9-4409-b3ce-004a48ccf763','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('4c02ec82-a085-4d11-bcc5-e69ef920c062','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('23228200-9412-4feb-b563-2bbffbbfe821','115a528e-042b-4055-bc97-ba7a1b5dc412','4922d5cc-bae2-4bca-85e8-20045b3eb0ee','2024-02-02 16:50:36.261636'),
     ('1bab3391-273c-4d8f-b035-45e9282e6d68','bea0dc91-7503-47d3-83fb-55a08fc31ead','5efa6081-31e9-4716-a470-619139487ef3','2024-02-03 12:36:03.778276'),
     ('35b5d499-0623-4ba6-8633-294bed73278c','03d1c9fb-a17e-418b-92e5-8f278225ef12','5efa6081-31e9-4716-a470-619139487ef3','2024-02-03 12:36:03.778276'),
     ('6d9f9d0b-96d9-4074-8160-240dea9ad6b9','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','5efa6081-31e9-4716-a470-619139487ef3','2024-02-03 12:36:03.778276');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('4e4ba28e-5707-4e12-87c7-a756b739a890','a3a3166e-1e81-4527-b545-c90ca0c6366a','5efa6081-31e9-4716-a470-619139487ef3','2024-02-03 12:36:03.778276'),
     ('7f3b4c40-af9b-4ae8-b8c3-15542022c695','80f0d83a-2e2d-46c0-a2cf-e90950b22d15','5efa6081-31e9-4716-a470-619139487ef3','2024-02-03 12:36:03.778276'),
     ('a4428d7a-c602-4f0f-ac04-5f31cc05bf8c','8c7e578b-4918-4e36-91d0-d77edd73a470','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('868570c3-37ba-4a34-80c8-5d19bef16a31','57220801-cfd2-409d-9efc-16f5c55ec521','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('771dd2ff-6344-4473-bea3-e8f820a2f804','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('f6eb889e-5ef6-4c29-96c3-284122d4762c','fb4a06e5-2a31-439a-8935-367670c1e060','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('daf53254-674d-4683-9986-e7be8d4e737f','840d0b10-cce9-43d4-b57e-d381193335eb','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('c1c2f2ac-0a00-465f-b3d5-0b3e9bfaaa35','9d40faa9-3695-43d6-a19c-4dc329edb8f4','10452e30-2901-4316-918e-6ccb15948b46','2024-02-04 12:59:39.632626'),
     ('990886d2-9692-41fe-8280-28d70cb81c73','840d0b10-cce9-43d4-b57e-d381193335eb','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853'),
     ('985815db-5b27-403e-8ceb-403281295f62','52e416ed-2057-4bdf-b581-69fc64419d5d','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('47690b8c-c938-44e2-b05b-8d25457e1d13','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853'),
     ('7b0d6902-72b3-4550-a9cb-8fc7f8f9b5eb','7fb796f0-26a3-44e6-adf1-98f2f54e694b','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853'),
     ('8024f64c-b015-44cb-b037-0a10474d0950','76fed48b-5c6b-4e36-b58c-300918f2fc7f','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853'),
     ('a54e9c65-567a-44a8-a9f8-1e1542dedeae','5e17d1ff-5cd1-4736-a123-635b36225eea','80988314-062c-4e3b-bb34-fc09a505798d','2024-02-01 13:56:35.065853'),
     ('e7c95748-b1ec-4699-8eb4-36458159fed4','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','2574828d-8de2-4981-b10d-5f071f0b17d3','2024-02-03 15:29:13.637318'),
     ('19644972-d03f-4822-a7a9-e07fe55e7c38','ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','2574828d-8de2-4981-b10d-5f071f0b17d3','2024-02-03 15:29:13.637318'),
     ('297078f1-2195-499a-a8ba-c90abe70165f','7c581969-99db-40f8-b4d1-f8b0a244cc2f','2574828d-8de2-4981-b10d-5f071f0b17d3','2024-02-03 15:29:13.637318'),
     ('8fdbc419-16c6-4920-8665-94c1a94c443c','002260f4-e718-419f-bd96-8cc39b743013','2574828d-8de2-4981-b10d-5f071f0b17d3','2024-02-03 15:29:13.637318'),
     ('9c4356f2-34a6-4980-bf39-fa566487d548','54ef1506-540c-4567-afb9-406ae9d95e34','2574828d-8de2-4981-b10d-5f071f0b17d3','2024-02-03 15:29:13.637318'),
     ('29ea8f70-49e5-4eea-98eb-b3e4d015a2c2','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','03b07816-e733-4233-9b8f-a9dc000938d5','2024-02-01 11:21:30.968618');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('3ae6bf59-2058-4bc9-a67f-d16da5d8097a','0c718674-7871-4988-8746-3b40027ac3b1','03b07816-e733-4233-9b8f-a9dc000938d5','2024-02-01 11:21:30.968618'),
     ('9ac6ce7e-329b-42af-985f-498464ddeadc','a4fd4b25-55e9-49ee-b25a-e5a00a03d546','03b07816-e733-4233-9b8f-a9dc000938d5','2024-02-01 11:21:30.968618'),
     ('75706f5d-9314-4f7e-8170-4ab8c0b6303f','54ef1506-540c-4567-afb9-406ae9d95e34','03b07816-e733-4233-9b8f-a9dc000938d5','2024-02-01 11:21:30.968618'),
     ('8ba15cae-4726-490a-ad1c-a4fd21cabcda','e9110b99-b085-4070-b27d-901aeb8ddafb','267496b0-1b6b-4021-94bf-0322de9743b4','2024-02-04 13:38:27.671878'),
     ('8173f003-1597-474b-9ede-f15a0c0108d5','ab998306-eab1-45ce-99fb-475fe005bfb3','267496b0-1b6b-4021-94bf-0322de9743b4','2024-02-04 13:38:27.671878'),
     ('5354e1a9-083c-45c9-a9b3-e2ada3d24b4f','40986a1a-9949-43af-833f-8e3f007b1bfa','267496b0-1b6b-4021-94bf-0322de9743b4','2024-02-04 13:38:27.671878'),
     ('74671c1c-a270-4643-a166-8beef43450e8','ff5da20e-719f-4546-9050-b51ce5893289','267496b0-1b6b-4021-94bf-0322de9743b4','2024-02-04 13:38:27.671878'),
     ('f7e1b5cd-799a-4e45-bdcd-d97573cdbefa','7c980fde-0868-4ac0-92e3-330db7529b74','267496b0-1b6b-4021-94bf-0322de9743b4','2024-02-04 13:38:27.671878'),
     ('fad475dc-ab6b-429e-9632-836cf4b96da9','04197ba3-83ff-4ccb-8344-c416866cdce3','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('318de299-059d-4887-926d-72b1930f75a9','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('75fcfefb-4e2c-4eba-8182-5523995eff97','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('0261bdf7-ff3b-47a8-9198-24e76aae8424','0678c3f9-c14c-4ac8-82d8-84ceb93af430','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('bd020fae-732e-4d30-a7b2-02dfc1fba968','af14befa-6203-459d-ae31-cbd71e8cca0e','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('93f1b3e4-8ee1-45b8-bf63-b3ba277c9fb5','414343ae-bf9c-41a8-a79f-126804314ea6','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('656ef737-8d51-4e39-85b8-378742df5cbd','9f7c1428-0df3-48c5-a187-d33d6ac03006','97c6961c-1013-461f-a127-8776038455c2','2024-02-03 11:25:48.463792'),
     ('71a68d56-3f32-4126-a0aa-dd308b65ebe3','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','d1abe84d-7d8f-4d0a-98c7-f22d808d3d47','2024-02-06 12:54:36.443901'),
     ('1e506c72-d20c-43eb-9a13-41ab7cbb7de9','724b55b5-650f-4526-aeba-df3d907b7ad5','d1abe84d-7d8f-4d0a-98c7-f22d808d3d47','2024-02-06 12:54:36.443901'),
     ('d9e61f48-4eed-4e2b-8858-406db28daf4f','e16633b3-55b9-4acb-9e36-e3b3551c5be8','d1abe84d-7d8f-4d0a-98c7-f22d808d3d47','2024-02-06 12:54:36.443901'),
     ('8a30efb1-de47-4f3b-91c0-4987fbf785f3','1f2fedb8-f19e-4865-8216-85f799d8beef','d1abe84d-7d8f-4d0a-98c7-f22d808d3d47','2024-02-06 12:54:36.443901'),
     ('8c844f88-e1f5-4344-a549-f48c2c9483cd','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('b97bc792-55cc-4d52-8c3c-a3aeb3de85e5','13dafda4-726b-4318-b683-816ba41cc201','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685'),
     ('93662308-bcbb-4a87-bf86-49ea3d63871f','9f7c1428-0df3-48c5-a187-d33d6ac03006','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685'),
     ('2b8f1ba6-9afc-4208-942c-068c17aec89c','e16633b3-55b9-4acb-9e36-e3b3551c5be8','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685'),
     ('79960866-0ea0-4b38-9e8c-06bf78fea708','06332dcf-95ae-4268-be24-c4496f1913f0','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685'),
     ('324ec9b1-a80b-4a8d-9f2b-f0332003423f','7dfc26f3-df2f-42fc-be4d-26ff0e74cf4c','1da62425-930d-4afd-8494-3801493bf922','2024-02-07 14:21:21.986685'),
     ('49d28988-ded1-4d73-af6e-58e96797ed2c','c8c4650c-71c8-46ef-b813-f09e063dbc99','4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','2024-02-02 09:55:14.361199'),
     ('d9b608eb-c6d8-4473-a736-8c04ba592d7c','7fb796f0-26a3-44e6-adf1-98f2f54e694b','4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','2024-02-02 09:55:14.361199'),
     ('b391e8c8-120f-4730-9542-83b9a4265c2a','386e6f19-ff6e-48be-954e-f9dfa51b5b80','4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','2024-02-02 09:55:14.361199'),
     ('ab5eae9b-1d30-4bdc-8c20-6cc01c285ea1','2b8b6da1-7f3a-48f8-ae0e-e2f77b4d2179','4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','2024-02-02 09:55:14.361199'),
     ('2d2618ae-449c-4876-b3fb-51ca2e156c87','30c2ec07-d373-42a0-8394-2944a209eea9','4a9f8138-effd-46ff-bd43-4e4c8ec6e4ae','2024-02-02 09:55:14.361199');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('8fb145cd-2e2f-4533-b07d-7ba2c47c5d70','83675628-8d93-48b5-9234-46f30d460a0a','826e6d9e-8eae-452a-82a8-26e26d62a048','2024-02-08 14:37:30.003335'),
     ('e5f3d2a3-47f3-41c3-8d94-ebae3a5f38ed','c8c4650c-71c8-46ef-b813-f09e063dbc99','826e6d9e-8eae-452a-82a8-26e26d62a048','2024-02-08 14:37:30.003335'),
     ('bd459a60-b717-4005-9752-873426be8fe7','e966b1c1-f8fc-4b86-8538-f6ef2b2a6388','826e6d9e-8eae-452a-82a8-26e26d62a048','2024-02-08 14:37:30.003335'),
     ('c833029f-49a9-4612-aa2f-70d2376d9bd4','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','826e6d9e-8eae-452a-82a8-26e26d62a048','2024-02-08 14:37:30.003335'),
     ('cedfe89e-c8f3-426b-825b-8b080c1dbfc3','afb07919-382b-4ac2-8ca2-5e5b04445840','71c8cefd-ee9f-4b33-9b2e-88d595014638','2024-02-06 10:47:29.546978'),
     ('ee97c5aa-181a-4bf2-9b86-64ba76815382','3d016b73-5721-46a0-aded-c522e70c61b8','71c8cefd-ee9f-4b33-9b2e-88d595014638','2024-02-06 10:47:29.546978'),
     ('0b5a642d-4a7c-4579-a806-04d14f5b73d3','b9ba13f8-222f-4786-8c27-c237b134cc55','71c8cefd-ee9f-4b33-9b2e-88d595014638','2024-02-06 10:47:29.546978'),
     ('5c67a357-81a7-4a64-b850-11a7cbfe3547','4ba65332-3c44-4143-a34b-253073c73578','71c8cefd-ee9f-4b33-9b2e-88d595014638','2024-02-06 10:47:29.546978'),
     ('3841e5fc-6e75-462f-997e-e3304795c957','0acc5e48-5c5b-4a90-8758-3476bdc751fb','d66954a3-7142-4b7d-8315-bb572ab33c15','2024-02-04 17:21:20.576964'),
     ('8dbc7648-7052-4f95-9360-05192f9dd691','5e17d1ff-5cd1-4736-a123-635b36225eea','d66954a3-7142-4b7d-8315-bb572ab33c15','2024-02-04 17:21:20.576964');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('cd5a83b7-8eab-421d-b0a1-9cb1bbc444d1','75428ee5-d717-4869-a69c-3e3291a36588','d66954a3-7142-4b7d-8315-bb572ab33c15','2024-02-04 17:21:20.576964'),
     ('9e1fd3f5-0bd0-4372-ae2b-0743adeb04b8','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','d66954a3-7142-4b7d-8315-bb572ab33c15','2024-02-04 17:21:20.576964'),
     ('3cbf4647-f259-4483-abc0-b0745cab3e0e','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('bc25adc5-b3dd-47b5-8d5b-a1739c0a0802','edf26d44-e2df-4bae-aae9-cfbf5bd37a35','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('31491b62-854b-4477-9a2e-2dfe9a4bf438','03d1c9fb-a17e-418b-92e5-8f278225ef12','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('6fa8500e-f68f-4c0a-99ed-3a699cb95b63','4ba65332-3c44-4143-a34b-253073c73578','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('be1d3204-c4ae-4eb2-b1b9-226a79643f53','fb1771b0-a925-4a76-bc59-5038b7a1fa31','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('384a2e8a-507c-4773-8a96-0e0abdaae72c','e5d0db67-242a-4b88-b335-ccc0d0af8879','31966e82-00e4-4e17-8857-3284a0cb0764','2024-02-07 13:26:24.267342'),
     ('3f567d5d-8957-45af-8903-fee1196607d5','934b07ed-1fb8-42ac-8b6c-ccb39cc5ffbe','177f9734-b34a-4d23-a819-e4f1f895d7c7','2024-02-07 12:32:29.65738'),
     ('134f5d69-aa70-4381-bf05-f0eaa0941ea9','ba4af011-5baa-4346-a9cb-391a14138991','177f9734-b34a-4d23-a819-e4f1f895d7c7','2024-02-07 12:32:29.65738');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a67520fd-cd14-4712-b421-321819620271','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','177f9734-b34a-4d23-a819-e4f1f895d7c7','2024-02-07 12:32:29.65738'),
     ('8f615e15-70d6-4b8f-a840-ed63a38a1b98','75428ee5-d717-4869-a69c-3e3291a36588','177f9734-b34a-4d23-a819-e4f1f895d7c7','2024-02-07 12:32:29.65738'),
     ('29f9e4cd-d0ca-43be-a074-b0a734cd050b','bea0dc91-7503-47d3-83fb-55a08fc31ead','94f7bb74-d510-49e0-a67e-38ba5ad0117f','2024-02-08 14:34:04.297355'),
     ('b7731d84-66af-44ec-8325-f34b6a730b09','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','94f7bb74-d510-49e0-a67e-38ba5ad0117f','2024-02-08 14:34:04.297355'),
     ('bd8bf18c-8285-4f59-b6ce-6c168edd8ee2','8b67aaa0-d4eb-45ab-9d41-97e5d4ddae1a','94f7bb74-d510-49e0-a67e-38ba5ad0117f','2024-02-08 14:34:04.297355'),
     ('712ee7bb-d303-4649-9e8c-79be407ccb47','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','94f7bb74-d510-49e0-a67e-38ba5ad0117f','2024-02-08 14:34:04.297355'),
     ('b8e1d972-4afd-42ae-904d-316a1b84e2b2','f00ecf87-1b80-41cf-b680-b7f3b32b626c','7b27d021-592c-412e-8140-88fa5ef8639c','2024-02-05 13:46:31.039412'),
     ('7fc892f3-ec3b-43d7-8bfc-c9a3e860b560','40986a1a-9949-43af-833f-8e3f007b1bfa','7b27d021-592c-412e-8140-88fa5ef8639c','2024-02-05 13:46:31.039412'),
     ('16d4368d-b2c9-4112-a221-b32fda59edf8','fb1771b0-a925-4a76-bc59-5038b7a1fa31','7b27d021-592c-412e-8140-88fa5ef8639c','2024-02-05 13:46:31.039412'),
     ('c7f997b4-bd1a-4bf7-8806-3beaf9251936','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','7b27d021-592c-412e-8140-88fa5ef8639c','2024-02-05 13:46:31.039412');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a7ffbb54-4f87-4f5e-9cbb-715e83b6dfad','ab998306-eab1-45ce-99fb-475fe005bfb3','3427ae3f-5344-4bec-8101-d663b5e7c32c','2024-02-07 15:16:21.974386'),
     ('0e127733-7fcd-44df-b6bc-626da1829b75','3d016b73-5721-46a0-aded-c522e70c61b8','3427ae3f-5344-4bec-8101-d663b5e7c32c','2024-02-07 15:16:21.974386'),
     ('9931635d-f411-4138-8565-647f01d0755a','b9808c9a-d25b-422a-ad77-8b270e3c46c1','3427ae3f-5344-4bec-8101-d663b5e7c32c','2024-02-07 15:16:21.974386'),
     ('68ceb611-870f-43ab-82d6-f951391acca4','40986a1a-9949-43af-833f-8e3f007b1bfa','3427ae3f-5344-4bec-8101-d663b5e7c32c','2024-02-07 15:16:21.974386'),
     ('5db64c1b-9d21-43e9-bd30-afa049287a7f','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','3427ae3f-5344-4bec-8101-d663b5e7c32c','2024-02-07 15:16:21.974386'),
     ('1a785539-5c59-4c8f-a439-add5fbe176b9','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','b94822df-63ac-41c1-a51e-ccd93961ee07','2024-02-08 15:37:18.101998'),
     ('3bf3f5c1-3884-4894-a396-e9ca57e1cf70','a05eef2f-5eec-4520-b647-98a890495b67','b94822df-63ac-41c1-a51e-ccd93961ee07','2024-02-08 15:37:18.101998'),
     ('d322217a-b42e-4464-ad1e-1cbb26d722db','d9514ea9-a38d-4d4e-a448-08e195b083fb','b94822df-63ac-41c1-a51e-ccd93961ee07','2024-02-08 15:37:18.101998'),
     ('c4614799-3b0b-492a-ab79-36092a61fee1','57cecd71-4967-4aa1-81b0-2d5b89f08692','b94822df-63ac-41c1-a51e-ccd93961ee07','2024-02-08 15:37:18.101998'),
     ('4518548b-2480-4389-9c49-fc2c403badb8','ff5da20e-719f-4546-9050-b51ce5893289','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('b6a6cd42-bcf2-4eb0-8714-9f7f623e2deb','b01b4cc0-687a-415b-9fb6-d75466f5ccd3','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425'),
     ('bce20282-bcdd-4959-8857-f8525934f7a4','13dafda4-726b-4318-b683-816ba41cc201','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425'),
     ('b6546e6e-33be-4dd2-93e9-a7d087249985','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425'),
     ('2c06bf45-72bf-4c36-9192-b97354053476','40fb1281-c7d9-4066-9308-e911783ce188','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425'),
     ('527d1868-03b2-4f37-8794-61ecf1e03b81','115a528e-042b-4055-bc97-ba7a1b5dc412','e57110b1-d96a-414e-8ad8-498deda75c63','2024-02-03 13:51:44.391425'),
     ('6474ff7c-f42f-4fcd-864c-5e163f80e39c','e5d0db67-242a-4b88-b335-ccc0d0af8879','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325'),
     ('8083b3bc-f3d7-47b4-a73b-ce4983cdca7c','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325'),
     ('1a7b17fc-1ea0-40bd-896a-8f3a96720fcc','30c2ec07-d373-42a0-8394-2944a209eea9','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325'),
     ('512fe2d9-58e0-4d03-90db-06e6fa6fc033','37bc394a-7d32-49ea-b123-16e9de728b62','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325'),
     ('85145e98-2a19-4dc0-a6e9-cc87920d979d','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('5bd71331-ad5b-42d0-9856-4262cf08be6c','837b194c-d0ff-406b-ad3e-c0a499451ca0','358a1887-24b4-48f8-9324-b494244e4d10','2024-02-04 13:34:43.917325'),
     ('013893b3-86ce-4977-9c7b-60db4c8744e2','564e84c3-0791-432c-9dd1-f5f41da54861','efd51625-6133-4b27-ba93-af69e4a7f1ca','2024-02-08 12:23:20.350868'),
     ('a55f7cad-02b1-4206-af7b-1d42c61e018f','75428ee5-d717-4869-a69c-3e3291a36588','efd51625-6133-4b27-ba93-af69e4a7f1ca','2024-02-08 12:23:20.350868'),
     ('f9eb70b0-bf6e-45d5-8df0-e0d6d1ffe061','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','efd51625-6133-4b27-ba93-af69e4a7f1ca','2024-02-08 12:23:20.350868'),
     ('36d60e13-d87c-49cf-bcd0-3c40b970b803','7c749acd-4feb-4a93-8339-13d9d3c42196','efd51625-6133-4b27-ba93-af69e4a7f1ca','2024-02-08 12:23:20.350868'),
     ('eacec5b1-ce6e-472c-86e0-036e06b2a60b','2b48e3f8-a709-41c8-a8c2-2bdb71f870ef','efd51625-6133-4b27-ba93-af69e4a7f1ca','2024-02-08 12:23:20.350868'),
     ('bbdb11b6-456e-408c-b9e9-7168b9db2538','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','0148dc4c-519f-457d-b3c6-f936471dad95','2024-02-06 14:10:45.182947'),
     ('1d68fc2b-4236-47b0-8c66-74cdd7979eed','52e416ed-2057-4bdf-b581-69fc64419d5d','0148dc4c-519f-457d-b3c6-f936471dad95','2024-02-06 14:10:45.182947'),
     ('353e0323-4701-45bf-a435-b13ce79370a3','7c581969-99db-40f8-b4d1-f8b0a244cc2f','0148dc4c-519f-457d-b3c6-f936471dad95','2024-02-06 14:10:45.182947'),
     ('84d71294-5013-47c2-b09e-8058957ec917','b9808c9a-d25b-422a-ad77-8b270e3c46c1','0148dc4c-519f-457d-b3c6-f936471dad95','2024-02-06 14:10:45.182947');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('b0dcdf9f-fcee-47a3-9ba9-462e76a6d0d5','386e6f19-ff6e-48be-954e-f9dfa51b5b80','0148dc4c-519f-457d-b3c6-f936471dad95','2024-02-06 14:10:45.182947'),
     ('ee22d630-9df3-47ef-b2b9-62db7310a9a9','fb4a06e5-2a31-439a-8935-367670c1e060','8da5528c-7ec3-4774-b048-f25d9e9ba13c','2024-02-07 15:40:04.718549'),
     ('3dee87e9-bbd5-4ef6-b17d-55f463903a35','fae9d942-de16-48d5-8e27-3c271e6071f6','8da5528c-7ec3-4774-b048-f25d9e9ba13c','2024-02-07 15:40:04.718549'),
     ('14b9c3f2-afd1-4319-8dd5-930cad1d8f35','48ec44ba-9413-46cd-92d1-866f58092166','8da5528c-7ec3-4774-b048-f25d9e9ba13c','2024-02-07 15:40:04.718549'),
     ('c32f43aa-12e5-4912-a655-7d93a1164d5c','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','8da5528c-7ec3-4774-b048-f25d9e9ba13c','2024-02-07 15:40:04.718549'),
     ('d6f2b695-d305-4db3-84cb-629478bb2b05','f39ebe32-2918-4fb2-ac3f-3352f7601f4a','8da5528c-7ec3-4774-b048-f25d9e9ba13c','2024-02-07 15:40:04.718549'),
     ('59083e4d-1848-41d9-b2d8-df425a18d944','f4cf9bf0-dd04-46e7-9473-179d073ff6f8','eec1dcf5-df27-42d1-86b2-95f13d40bc38','2024-02-07 15:40:41.437314'),
     ('175a1668-2016-4073-99af-4ced933c522d','0797bfbf-9574-4264-9187-548f22b108a3','eec1dcf5-df27-42d1-86b2-95f13d40bc38','2024-02-07 15:40:41.437314'),
     ('d5e0cde0-90fb-4e30-9c7b-2cf1ff1d2ad7','06332dcf-95ae-4268-be24-c4496f1913f0','eec1dcf5-df27-42d1-86b2-95f13d40bc38','2024-02-07 15:40:41.437314'),
     ('7890228b-d87e-464b-8f30-4c3d08ad4dc4','dedf0663-486e-489b-abba-22c8106ff1a6','eec1dcf5-df27-42d1-86b2-95f13d40bc38','2024-02-07 15:40:41.437314');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('3f45ecad-4b58-4dd6-a594-986f95170b5f','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','eb4d7fb5-e886-444f-a0b5-0c4011c8852c','2024-02-02 13:05:44.781593'),
     ('133ff959-4ac8-4397-a71e-cbc3fbc762df','4c70dbd1-12d1-46e2-8112-b6d9848844de','eb4d7fb5-e886-444f-a0b5-0c4011c8852c','2024-02-02 13:05:44.781593'),
     ('3b6b5ec9-7b0e-4952-8cc9-00563c57f119','1f153562-754c-42cb-950d-9331304561b3','eb4d7fb5-e886-444f-a0b5-0c4011c8852c','2024-02-02 13:05:44.781593'),
     ('893617cd-32c5-43e0-a23e-2ea7f3365542','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','eb4d7fb5-e886-444f-a0b5-0c4011c8852c','2024-02-02 13:05:44.781593'),
     ('dbf9a22c-2f5d-4228-a825-cb307eb2a319','48ec44ba-9413-46cd-92d1-866f58092166','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051'),
     ('85bcce3e-0a7f-417c-ae6f-43f6e7afefb3','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051'),
     ('f3e9713f-fcfc-44d7-8883-6ca263bc24f4','a3a3166e-1e81-4527-b545-c90ca0c6366a','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051'),
     ('94784307-5ff5-456d-bb50-3ab199948956','6e0a9e64-cfec-4afa-aa19-839412112cdf','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051'),
     ('6192e6f1-dee2-4f75-a80b-de55031cf5a5','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051'),
     ('a8b74ec8-dc48-474c-8ade-fd25afaedc29','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','c1e2c28f-8e9a-41ec-b17f-5473dba51ae8','2024-02-06 14:43:52.43051');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('2305fd5d-5d20-4b48-93c6-46535f591fef','b469ad32-ed71-4201-9b6c-4f300b2a480d','e8db3939-05a7-4027-a665-b351a38b6dae','2024-02-06 15:05:09.432996'),
     ('c7b54657-a068-43b7-9bcc-fc2cbda0b0eb','9f96c58b-8753-4732-a0d4-05477a9a39f5','e8db3939-05a7-4027-a665-b351a38b6dae','2024-02-06 15:05:09.432996'),
     ('787559ca-07d2-4b91-87b7-f3c91cff6f68','b01b4cc0-687a-415b-9fb6-d75466f5ccd3','e8db3939-05a7-4027-a665-b351a38b6dae','2024-02-06 15:05:09.432996'),
     ('ef10f838-d370-4660-8a3d-9c989d3b56af','564e84c3-0791-432c-9dd1-f5f41da54861','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('704706d6-49cc-4f73-8392-18c7e952e005','bec4c6f8-8b05-479d-b0c8-916556329916','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('35297bd8-7836-490c-b587-cba1c7e96d6b','414343ae-bf9c-41a8-a79f-126804314ea6','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('b21bada3-33e4-4e68-99c9-36f9cfc9aa9a','4c70dbd1-12d1-46e2-8112-b6d9848844de','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('7144d900-d0ae-4947-9e02-a5e2e91419c4','06332dcf-95ae-4268-be24-c4496f1913f0','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('ef6d28df-5f99-42a6-b7e8-163c5388560f','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','47ed7896-97ad-4f5e-861d-354d364b13fe','2024-02-08 12:50:54.58968'),
     ('c9f2d7e2-b1de-4b13-b822-06972cc8687b','944c1df7-83fc-4e02-acfa-a051247ccb7b','6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','2024-02-08 11:23:21.792501');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('e6249f89-aabb-4684-a979-c947da87cf5c','783a5a8a-d439-487d-a190-6a2fc5903553','6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','2024-02-08 11:23:21.792501'),
     ('549b16ae-75c7-4ded-920f-1d3db9b6562e','57cecd71-4967-4aa1-81b0-2d5b89f08692','6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','2024-02-08 11:23:21.792501'),
     ('00d538d6-0ff9-4798-b240-1edfcd4e438c','37bc394a-7d32-49ea-b123-16e9de728b62','6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','2024-02-08 11:23:21.792501'),
     ('aa3209a7-4dc5-4e6b-9048-1ee0d75012e9','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','6ffdc790-2e2a-4c2d-915d-8dfaa7a2dd29','2024-02-08 11:23:21.792501'),
     ('a1287d4c-a979-419b-ab29-845d1013d637','48ec44ba-9413-46cd-92d1-866f58092166','63c5d88b-0614-41b8-b030-b30fca61f8d5','2024-02-07 11:53:46.765136'),
     ('f7d913d2-c286-4cf7-959e-76a4014b3f16','4c70dbd1-12d1-46e2-8112-b6d9848844de','63c5d88b-0614-41b8-b030-b30fca61f8d5','2024-02-07 11:53:46.765136'),
     ('6f9a4947-995b-4ec4-a220-d223bd4d4b1c','3d016b73-5721-46a0-aded-c522e70c61b8','63c5d88b-0614-41b8-b030-b30fca61f8d5','2024-02-07 11:53:46.765136'),
     ('7319ecca-d617-4897-9d17-fc1746ec07f1','f3342d28-c729-4dd9-b19e-564446e89557','63c5d88b-0614-41b8-b030-b30fca61f8d5','2024-02-07 11:53:46.765136'),
     ('0a8496ef-1d8c-4df4-9d6a-c6e3a27285ef','5466a968-f9c8-477f-b7f0-f3adb1e55470','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202'),
     ('7405c131-2070-45c4-be6f-f9835a76aff2','f8996c4e-3b0c-4ab5-98a2-e079bedcfd85','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('51487599-3c45-4eb8-8244-02a41fe8c823','3d016b73-5721-46a0-aded-c522e70c61b8','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202'),
     ('ce97972a-f2b1-431a-9869-98c9ea3beb46','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202'),
     ('4f59534f-93a1-418f-8016-9f9bd5b90e05','b469ad32-ed71-4201-9b6c-4f300b2a480d','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202'),
     ('93f814f0-8f01-470c-9170-96120264d8f2','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','fe9a1895-af13-4a9e-a017-9e59bf7d4758','2024-02-07 11:46:57.285202'),
     ('5fb75e65-4923-41f3-bb91-29e8c3a4b410','7d7f447f-d0ef-4ab7-8d45-9990796c9094','6d386860-80dc-4892-a6bf-9a59ab0c0324','2024-02-03 13:45:20.892471'),
     ('85728bc4-9263-4dbc-a687-b091e0e2b0bf','d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','6d386860-80dc-4892-a6bf-9a59ab0c0324','2024-02-03 13:45:20.892471'),
     ('da9127c5-11db-42e8-a201-2d170a76da91','b12f9b56-0e18-4e37-b92b-79af1ec384bb','6d386860-80dc-4892-a6bf-9a59ab0c0324','2024-02-03 13:45:20.892471'),
     ('0bbc4170-5445-4aea-9dd1-4f1baf73eee1','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','6d386860-80dc-4892-a6bf-9a59ab0c0324','2024-02-03 13:45:20.892471'),
     ('483005fb-18e7-432b-a788-1a38125c99cb','273e1045-52b0-47fb-9023-897a0c77a2ce','6d386860-80dc-4892-a6bf-9a59ab0c0324','2024-02-03 13:45:20.892471'),
     ('c28c2024-9948-41ab-843b-e505e155e486','7c980fde-0868-4ac0-92e3-330db7529b74','4cf8790b-8459-4abe-9a8f-f066e422c791','2024-02-04 11:23:22.577734');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('39201c9a-f62d-40ad-9ee2-37f155964306','9f7c1428-0df3-48c5-a187-d33d6ac03006','4cf8790b-8459-4abe-9a8f-f066e422c791','2024-02-04 11:23:22.577734'),
     ('82914448-e587-4e71-95aa-fa3ce68c574e','69f29151-e648-4689-88e6-1ceaed25a7af','4cf8790b-8459-4abe-9a8f-f066e422c791','2024-02-04 11:23:22.577734'),
     ('f0e2c0ad-7fbd-455c-a5da-923c92524dda','79dbd01d-717c-483a-9797-bfa1aee8707f','4cf8790b-8459-4abe-9a8f-f066e422c791','2024-02-04 11:23:22.577734'),
     ('8bb29fdc-5980-4272-bcd9-83fa04b8542a','8c7e578b-4918-4e36-91d0-d77edd73a470','a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','2024-02-05 13:59:54.164995'),
     ('600c06cb-87f0-4e18-b57b-6afdae2c3472','77f1be48-5c6b-44f8-ac52-7a760c7faf9c','a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','2024-02-05 13:59:54.164995'),
     ('153b30b0-7bbf-4638-b49f-c5773240f9aa','386e6f19-ff6e-48be-954e-f9dfa51b5b80','a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','2024-02-05 13:59:54.164995'),
     ('6a458637-3d34-4d72-b04e-35d93ee66abb','bbfdda21-be2b-4fb4-b02c-b9de5902dd39','a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','2024-02-05 13:59:54.164995'),
     ('561ef672-aa25-4c15-932b-12777f24462d','414343ae-bf9c-41a8-a79f-126804314ea6','a41cd7d8-67d4-40a6-aa4b-ac5f9ba1d435','2024-02-05 13:59:54.164995'),
     ('0b653aba-b6fd-4a42-9978-cc3913c9f253','3d633591-6215-4adc-a453-40e68ec916a4','d58c5f59-1899-4d40-9393-94c9516f17cc','2024-02-02 16:22:05.741315'),
     ('55f4e672-e51b-4b0c-9753-c4368be65c94','b9ba13f8-222f-4786-8c27-c237b134cc55','d58c5f59-1899-4d40-9393-94c9516f17cc','2024-02-02 16:22:05.741315');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c1114e36-9878-4f95-8065-91fee2d5570c','33631b9f-0169-4cae-8403-93aa80127cbc','d58c5f59-1899-4d40-9393-94c9516f17cc','2024-02-02 16:22:05.741315'),
     ('7f3a4a26-8dce-4b3b-a5f2-49319feafbeb','ab998306-eab1-45ce-99fb-475fe005bfb3','d58c5f59-1899-4d40-9393-94c9516f17cc','2024-02-02 16:22:05.741315'),
     ('294c617c-e9f1-417f-af49-81e3ffb18a7f','6e0a9e64-cfec-4afa-aa19-839412112cdf','d58c5f59-1899-4d40-9393-94c9516f17cc','2024-02-02 16:22:05.741315'),
     ('102dba40-a1ec-4a4b-bc59-120ac7c6125f','4fa7b45c-d365-4d3a-86ad-9f18573a5512','9390a16c-e3dd-4408-ab32-eacc17d32145','2024-02-03 12:59:11.980414'),
     ('0e391aef-d82d-4e0a-a4c1-eca357c21d27','944c1df7-83fc-4e02-acfa-a051247ccb7b','9390a16c-e3dd-4408-ab32-eacc17d32145','2024-02-03 12:59:11.980414'),
     ('89b69244-0932-485a-a92c-4a5acd8787b9','837b194c-d0ff-406b-ad3e-c0a499451ca0','9390a16c-e3dd-4408-ab32-eacc17d32145','2024-02-03 12:59:11.980414'),
     ('91820d80-da19-455e-b808-6de29922c955','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','9390a16c-e3dd-4408-ab32-eacc17d32145','2024-02-03 12:59:11.980414'),
     ('0df8241f-b72f-4747-a6e9-de02c878e10d','8c7e578b-4918-4e36-91d0-d77edd73a470','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495'),
     ('53d09bfb-5226-4798-8e7f-329f63df35e3','a25d639f-435a-40fb-96d9-867e437eaa1b','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495'),
     ('6e30c3e8-bab8-4276-907f-cc04948f45fc','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('6bc48741-f448-46f2-b993-25def70dc62d','498aa683-e4fa-45dc-b265-56b002414598','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495'),
     ('5c3ab09c-672c-48d0-81d5-ebd134e871a8','16e56781-09b6-4271-9fac-ade178214849','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495'),
     ('14d6edee-a33f-442a-800c-971b7065fe95','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','9df98f5b-a811-4653-ae16-40cce57478c9','2024-02-04 15:39:26.76495'),
     ('cebe5985-f594-4666-a95a-cb2aaeeb76d5','d40e05ec-0129-4f9e-a1b5-7c66b1f51ac0','16f3d502-51ac-4622-85cc-e0d558f14039','2024-02-08 13:22:20.816539'),
     ('69219c39-206f-4b43-bcfd-bf935fb7d320','33631b9f-0169-4cae-8403-93aa80127cbc','16f3d502-51ac-4622-85cc-e0d558f14039','2024-02-08 13:22:20.816539'),
     ('d3c7773b-3667-4db4-b81c-8e5f1208c96d','944c1df7-83fc-4e02-acfa-a051247ccb7b','16f3d502-51ac-4622-85cc-e0d558f14039','2024-02-08 13:22:20.816539'),
     ('cf5913e1-a16e-4fc4-a15b-335c08c895a9','7d7f447f-d0ef-4ab7-8d45-9990796c9094','4959e3ae-9e37-432e-90cc-1ae1f50a00f1','2024-02-04 17:15:47.690428'),
     ('4e9b08a4-646d-4f12-b16b-3eb0d76c1da8','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','4959e3ae-9e37-432e-90cc-1ae1f50a00f1','2024-02-04 17:15:47.690428'),
     ('dd480548-8f35-487a-906c-445d2e1b9eb1','a3a3166e-1e81-4527-b545-c90ca0c6366a','4959e3ae-9e37-432e-90cc-1ae1f50a00f1','2024-02-04 17:15:47.690428'),
     ('c64f0810-7fd7-4fc7-baa1-97b4eb5108fc','a05eef2f-5eec-4520-b647-98a890495b67','4959e3ae-9e37-432e-90cc-1ae1f50a00f1','2024-02-04 17:15:47.690428');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('35aa56a1-55bd-4027-ad5d-8c03a2e34556','ff5da20e-719f-4546-9050-b51ce5893289','ea44bfd7-0a70-47f4-a9dd-1bc4cee4d3f1','2024-02-02 10:30:27.723347'),
     ('56890b2f-6e1c-4448-9479-2cc3076eed5a','9f7c1428-0df3-48c5-a187-d33d6ac03006','ea44bfd7-0a70-47f4-a9dd-1bc4cee4d3f1','2024-02-02 10:30:27.723347'),
     ('1e9ce0a3-f800-4203-b808-1b14d533f6ff','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','ea44bfd7-0a70-47f4-a9dd-1bc4cee4d3f1','2024-02-02 10:30:27.723347'),
     ('3753051e-47a0-4b38-a292-51739d9b8fd8','f00ecf87-1b80-41cf-b680-b7f3b32b626c','ea44bfd7-0a70-47f4-a9dd-1bc4cee4d3f1','2024-02-02 10:30:27.723347'),
     ('ef14435e-e858-4d13-ac73-f8cbe93656a3','b699576a-07af-4fd6-bcc5-6c912630c3a6','56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','2024-02-02 10:37:42.275574'),
     ('51b22ca4-0a54-4612-aaf4-fcf65e75e131','fb1771b0-a925-4a76-bc59-5038b7a1fa31','56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','2024-02-02 10:37:42.275574'),
     ('f3be52fa-a3ad-473d-8aa2-edc054237596','37bc394a-7d32-49ea-b123-16e9de728b62','56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','2024-02-02 10:37:42.275574'),
     ('d3c08c31-9a20-46bf-a7a8-52b86bf2bf95','e16633b3-55b9-4acb-9e36-e3b3551c5be8','56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','2024-02-02 10:37:42.275574'),
     ('7be8e3e3-2e4a-4829-bd01-1046c46eb40e','bbfdda21-be2b-4fb4-b02c-b9de5902dd39','56edc0e0-9ea8-44c7-8cee-28cf87ef7af6','2024-02-02 10:37:42.275574'),
     ('d3b3fed5-353c-4273-bcf1-2f3190d817fd','7c980fde-0868-4ac0-92e3-330db7529b74','c09ab23b-941e-4598-aef8-842037b9fe8e','2024-02-02 14:29:56.408402');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('a3574b94-654f-42df-85cf-14e9f55e176c','8c7e578b-4918-4e36-91d0-d77edd73a470','c09ab23b-941e-4598-aef8-842037b9fe8e','2024-02-02 14:29:56.408402'),
     ('df8354d5-5581-4bea-90e8-55b9ef68865c','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','c09ab23b-941e-4598-aef8-842037b9fe8e','2024-02-02 14:29:56.408402'),
     ('f2f1c113-a86b-467f-8a37-648ecfb0d24f','c5746a37-c2f7-438e-a004-2d8b62eb8b8c','c09ab23b-941e-4598-aef8-842037b9fe8e','2024-02-02 14:29:56.408402'),
     ('fcd769d8-67b8-4511-88b0-1fb1cdfe15cf','57cecd71-4967-4aa1-81b0-2d5b89f08692','c09ab23b-941e-4598-aef8-842037b9fe8e','2024-02-02 14:29:56.408402'),
     ('77c38162-8bdb-4662-92f4-08784118e1e9','944c1df7-83fc-4e02-acfa-a051247ccb7b','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('0a5dd111-915f-426d-b987-8eccc3742096','9231e3ad-6b2e-4fce-810e-963b45adeb84','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('b64e2f5f-1d6b-4508-9b83-a92e039b4d19','ab998306-eab1-45ce-99fb-475fe005bfb3','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('6e186919-177e-4698-8074-88555217c935','33631b9f-0169-4cae-8403-93aa80127cbc','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('fd0a87c6-b5cd-4532-ac5b-8e08254710ae','04197ba3-83ff-4ccb-8344-c416866cdce3','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('e696116f-307b-4637-842d-e8ba1f304cc1','57220801-cfd2-409d-9efc-16f5c55ec521','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('27cbcb09-e177-4097-a1a6-55b0533ffb13','1f153562-754c-42cb-950d-9331304561b3','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('7f30b22b-84de-4abd-8201-bc182b76d89f','8b67aaa0-d4eb-45ab-9d41-97e5d4ddae1a','8afd9a3e-25d9-4c88-a4b6-ef290593d80b','2024-02-07 13:02:29.114968'),
     ('11f8f031-f7ed-40b7-b8c9-252798b53c50','8aad9ff1-bfe4-4852-bb56-cda6359ed5bf','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('b830e8eb-7463-4fcd-8f3e-3de0973f8f2c','a162d19b-bd43-4e3a-b989-fbc37b0d2b83','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('9b5db99e-d7e4-4eee-9e32-afd96d04e347','0acc5e48-5c5b-4a90-8758-3476bdc751fb','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('f2f0003b-7cae-4c81-b110-0234627067a7','47df138d-c714-4344-844f-858d9307f5f3','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('3a6e1580-56cf-4422-8b27-6686fb3f6c86','61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('e36a9fb3-56b8-416f-adb8-b2278bc740d8','a3a3166e-1e81-4527-b545-c90ca0c6366a','1a295ec0-83aa-4604-a39b-7f0144902f78','2024-02-06 16:22:45.964966'),
     ('d1d17226-ce66-42c5-9849-6add269af5fb','04197ba3-83ff-4ccb-8344-c416866cdce3','15cc3485-0284-4ad4-bc82-b4944fa5283d','2024-02-02 13:58:35.287478'),
     ('36e3ecf8-9dc4-44ff-b0bd-028dd2f22092','69f29151-e648-4689-88e6-1ceaed25a7af','15cc3485-0284-4ad4-bc82-b4944fa5283d','2024-02-02 13:58:35.287478');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('7173d624-403f-41ed-822e-e37f8b642fc4','9d40faa9-3695-43d6-a19c-4dc329edb8f4','15cc3485-0284-4ad4-bc82-b4944fa5283d','2024-02-02 13:58:35.287478'),
     ('df0b35ee-57ea-41e5-885a-c8b9dc06d7a5','fb4a06e5-2a31-439a-8935-367670c1e060','15cc3485-0284-4ad4-bc82-b4944fa5283d','2024-02-02 13:58:35.287478'),
     ('bfc721d1-576a-4cc1-bd0d-fabbfe58c9fd','18883ccb-71e0-4af7-ae0f-4be8a69472c1','15cc3485-0284-4ad4-bc82-b4944fa5283d','2024-02-02 13:58:35.287478'),
     ('24efb973-f5d9-4902-84d5-625c7755e6be','ac38f34b-99d1-4a4d-acb8-738b299fb79c','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('f919cd6c-3d61-4efc-9663-d4c64e098ca8','b9808c9a-d25b-422a-ad77-8b270e3c46c1','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('b367f13a-555a-4257-8ce9-112f51a9ce76','a25d639f-435a-40fb-96d9-867e437eaa1b','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('12f38a04-a7f5-4a09-bf30-01fa9fbf824e','564e84c3-0791-432c-9dd1-f5f41da54861','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('634a6061-acc6-48ea-ba48-f4272ad94c25','724b55b5-650f-4526-aeba-df3d907b7ad5','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('4004682b-3be5-4bc7-9371-4b8e81ac481a','fb1771b0-a925-4a76-bc59-5038b7a1fa31','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631'),
     ('42e82206-e1bc-4ec5-a010-e04d361fec80','a5a38c7c-9b7d-45d5-b84f-b2365f7d14c4','62d483f7-6734-40b9-8bc8-f09206cf08fb','2024-02-05 14:13:43.023631');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('de256d3d-adf9-464f-bc62-e877c881c185','9231e3ad-6b2e-4fce-810e-963b45adeb84','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('1bee6288-d73e-417b-883f-918b15906eb9','8539137f-49e3-43a9-8340-806146c7f27a','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('784600ca-b690-49c5-ad7a-9464c01676a2','5e17d1ff-5cd1-4736-a123-635b36225eea','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('26511823-d981-474a-a995-e52a1ee88387','bea0dc91-7503-47d3-83fb-55a08fc31ead','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('426df770-3ab7-4037-ac54-13a005747a12','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('88a46264-ff8f-40c9-9af3-88cbfcb34284','6e0a9e64-cfec-4afa-aa19-839412112cdf','4baecf38-ac87-4ec8-ae6f-d2b940dea7f7','2024-02-03 15:13:42.206269'),
     ('db631f85-d3bb-4df5-b25e-4eabae24f219','8539137f-49e3-43a9-8340-806146c7f27a','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694'),
     ('697842f2-d404-4219-91b7-cc748ea00d56','b12f9b56-0e18-4e37-b92b-79af1ec384bb','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694'),
     ('e8100ec4-9795-4760-938b-9a78418a573e','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694'),
     ('b978a76c-8954-4987-b825-6f763fa3d747','5cc0a92e-9ba2-4833-9cb8-25f48730e7d3','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('18587cbd-0428-4c33-86f5-cd7b9ad9ee6f','62b2f8bd-de13-47d5-ae67-405e5305ead2','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694'),
     ('81cb5bd8-edd1-4170-90bf-c170ea7b24f0','7c581969-99db-40f8-b4d1-f8b0a244cc2f','99768113-2728-48be-88d4-3b9633a473cf','2024-02-01 12:19:25.254694'),
     ('2cd7d9ed-ed3c-4d0a-a17c-e4653d12ecb9','0f9ce201-dbb0-4dd2-9854-2707e6b40201','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('09cc05d9-4ae7-4d67-a1e9-f1d0a921bded','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('19c43020-5561-43c0-bbe8-266a3a108b48','783a5a8a-d439-487d-a190-6a2fc5903553','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('733f03f5-b4fd-4feb-a95a-b5df4f1911b9','b01b4cc0-687a-415b-9fb6-d75466f5ccd3','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('5952101d-e6fe-422b-9028-00b52d4ab91d','03f52765-4e12-454a-9e79-d8b8be7d7928','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('5867b402-068f-49cd-a515-65174ecd49da','bea0dc91-7503-47d3-83fb-55a08fc31ead','9fdf6d8e-1c10-4085-9777-20e1e3d5301a','2024-02-06 11:28:07.624387'),
     ('02173534-1d2f-43a0-b19a-9b829be913fd','fb4a06e5-2a31-439a-8935-367670c1e060','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431'),
     ('4eaba5b4-2acd-4b2a-b4c9-cdba30ed04d2','5da4cb5d-bea9-4409-b3ce-004a48ccf763','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('5c9f3e92-c64f-4526-8e51-ef14198a22be','6e0a9e64-cfec-4afa-aa19-839412112cdf','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431'),
     ('c98ecbb1-930d-4436-b0ca-df4843f2a104','30c2ec07-d373-42a0-8394-2944a209eea9','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431'),
     ('bebb1f0d-a745-43ad-b1b3-9891e421b9d7','40986a1a-9949-43af-833f-8e3f007b1bfa','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431'),
     ('423150ca-826f-41be-ac02-0148a3a59b38','77f1be48-5c6b-44f8-ac52-7a760c7faf9c','6f056ac5-6321-4810-93fa-36be3489c929','2024-02-05 12:29:01.491431'),
     ('cd00c856-bb74-497d-a43d-62b0c6dc4e5f','9d0c479f-8051-42b5-9fda-4050621fc41b','f36c140f-6926-4220-bc6a-12a76c7a30a0','2024-02-05 13:03:03.918553'),
     ('9c2b7f0d-6ff2-449f-94c8-70c30fe035f3','b4d0e92e-f607-4f07-b8f8-fb0985775292','f36c140f-6926-4220-bc6a-12a76c7a30a0','2024-02-05 13:03:03.918553'),
     ('f440fd1c-5124-4f4f-93fc-aa684c0ad907','e9110b99-b085-4070-b27d-901aeb8ddafb','f36c140f-6926-4220-bc6a-12a76c7a30a0','2024-02-05 13:03:03.918553'),
     ('8e787266-a86f-4ae6-b09b-1445dd2476b6','75428ee5-d717-4869-a69c-3e3291a36588','f36c140f-6926-4220-bc6a-12a76c7a30a0','2024-02-05 13:03:03.918553'),
     ('c8c3829b-b488-4d97-bec7-039328ac5fb2','124e4785-053a-4125-8bd7-f8738d667c4e','f36c140f-6926-4220-bc6a-12a76c7a30a0','2024-02-05 13:03:03.918553'),
     ('4d31d63d-e3ca-474c-9cf6-80f95950fe5c','8aad9ff1-bfe4-4852-bb56-cda6359ed5bf','a34f3434-52d1-4163-b83b-31b3729b7bd3','2024-02-08 13:28:57.484763');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('faf5afec-2421-43a6-825e-468feb878d22','cd93b7f2-4002-433b-96d5-f1346fb6f036','a34f3434-52d1-4163-b83b-31b3729b7bd3','2024-02-08 13:28:57.484763'),
     ('f69badc3-b28e-4f0e-9f4f-9d82535064d9','3032a0d6-bcd6-4e7a-a032-02b1bdd9ebce','a34f3434-52d1-4163-b83b-31b3729b7bd3','2024-02-08 13:28:57.484763'),
     ('8c67513d-6794-4b0f-a00e-89deea3a1a20','ab998306-eab1-45ce-99fb-475fe005bfb3','a34f3434-52d1-4163-b83b-31b3729b7bd3','2024-02-08 13:28:57.484763'),
     ('0328d7a8-9336-4b58-9ac5-47d4a71d79cf','18883ccb-71e0-4af7-ae0f-4be8a69472c1','8b41b293-95de-4873-bbea-c3620ddfe791','2024-02-04 12:33:32.43883'),
     ('a1293715-a3ba-4456-8651-6b817cf892bf','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','8b41b293-95de-4873-bbea-c3620ddfe791','2024-02-04 12:33:32.43883'),
     ('99f67771-9abd-4ce0-bd72-d920152726ae','ba4af011-5baa-4346-a9cb-391a14138991','8b41b293-95de-4873-bbea-c3620ddfe791','2024-02-04 12:33:32.43883'),
     ('e27bdedf-ef67-445e-aa8e-6e6fc6db6b48','564e84c3-0791-432c-9dd1-f5f41da54861','8b41b293-95de-4873-bbea-c3620ddfe791','2024-02-04 12:33:32.43883'),
     ('4068b513-87fc-431c-8af8-34d13dfd660d','76fed48b-5c6b-4e36-b58c-300918f2fc7f','8b41b293-95de-4873-bbea-c3620ddfe791','2024-02-04 12:33:32.43883'),
     ('94041ae0-627e-4389-be8d-2c082ac794db','724b55b5-650f-4526-aeba-df3d907b7ad5','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569'),
     ('3293268d-6ebf-4919-b03a-e5df4bc80239','b9808c9a-d25b-422a-ad77-8b270e3c46c1','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('be910643-6d23-4e19-a14b-bf293588f867','564e84c3-0791-432c-9dd1-f5f41da54861','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569'),
     ('ebf05af8-4c78-4420-8240-46700aeda22f','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569'),
     ('f643061c-abca-4407-b47c-3c7dd11083f9','9d0c479f-8051-42b5-9fda-4050621fc41b','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569'),
     ('eeae1093-dd6a-4b93-8255-34176328fb00','7c980fde-0868-4ac0-92e3-330db7529b74','f30b59ba-fe41-43c7-b7fa-6ab7e930c642','2024-02-01 16:22:51.762569'),
     ('5348dc10-ab26-4bbf-88c8-7ed2be96bd7e','1f2fedb8-f19e-4865-8216-85f799d8beef','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605'),
     ('049575a7-656b-4a6d-b70b-b5430ddc8b85','f00ecf87-1b80-41cf-b680-b7f3b32b626c','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605'),
     ('9cbece4f-da9a-4845-b14a-99aa9d5bac7f','837b194c-d0ff-406b-ad3e-c0a499451ca0','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605'),
     ('39468e90-92b3-428a-b221-a50d654ab2ef','944c1df7-83fc-4e02-acfa-a051247ccb7b','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605'),
     ('fa7c0751-6dd4-4042-8350-fefbfe168b72','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605'),
     ('925c23dd-dc7a-4f7e-8773-5b36fb38e86c','13dafda4-726b-4318-b683-816ba41cc201','ac94e43d-d950-4056-8008-5ae23542ec81','2024-02-02 16:19:30.915605');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('975dbb3b-292e-4691-a7a0-5f54017a43d2','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','5963c980-fa39-486a-b585-a85bef3f0a1d','2024-02-01 13:53:18.206274'),
     ('0d797397-b545-45e8-952d-22a1ad623c8f','f3277849-62ef-4ead-bb7f-3c3e7a9d832f','5963c980-fa39-486a-b585-a85bef3f0a1d','2024-02-01 13:53:18.206274'),
     ('f8a135f8-90ef-4d6d-bd86-26657b95cae7','42e2d4dd-dcac-49f0-ba99-7a56d2cdfb9d','5963c980-fa39-486a-b585-a85bef3f0a1d','2024-02-01 13:53:18.206274'),
     ('61f09aa0-fcdd-4fe3-9c6f-b23b391c5dc0','b8322e1b-079a-44de-ad59-4978b2fd4dcc','5963c980-fa39-486a-b585-a85bef3f0a1d','2024-02-01 13:53:18.206274'),
     ('f5c08b69-7afa-40f9-b7c7-4deca48ee504','a3a3166e-1e81-4527-b545-c90ca0c6366a','5963c980-fa39-486a-b585-a85bef3f0a1d','2024-02-01 13:53:18.206274'),
     ('27b19b34-73ee-4b73-a899-c99ba7f6cf29','7a8a6302-d49a-4dec-b1be-858c8cc1c2aa','0fb37c67-8380-482e-ac8a-7a906900ffd7','2024-02-04 10:55:33.71743'),
     ('d4d1f018-0ebc-4f44-a9b9-b15f6f6747d0','b12f9b56-0e18-4e37-b92b-79af1ec384bb','0fb37c67-8380-482e-ac8a-7a906900ffd7','2024-02-04 10:55:33.71743'),
     ('9c1b4bab-34b1-4b26-866a-ef73d46c02eb','bd7f32f4-590c-4d1d-ac70-8bb04f481329','0fb37c67-8380-482e-ac8a-7a906900ffd7','2024-02-04 10:55:33.71743'),
     ('b74983e5-0d91-4726-babc-b46b3f90d251','7dfc26f3-df2f-42fc-be4d-26ff0e74cf4c','9480c006-86e0-4f55-8ed4-2a1b93145935','2024-02-04 12:18:18.636105'),
     ('a53e050a-2a9c-4b9c-8eaa-4a5065522434','75428ee5-d717-4869-a69c-3e3291a36588','9480c006-86e0-4f55-8ed4-2a1b93145935','2024-02-04 12:18:18.636105');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('5ffd05fa-a427-4f6d-b6c7-aa129692c23e','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','9480c006-86e0-4f55-8ed4-2a1b93145935','2024-02-04 12:18:18.636105'),
     ('3a4c0cb3-5ed3-4689-ad8c-c46c990205e3','7d7f447f-d0ef-4ab7-8d45-9990796c9094','9480c006-86e0-4f55-8ed4-2a1b93145935','2024-02-04 12:18:18.636105'),
     ('1d23e9e2-d7bf-4d58-9a22-3172fb13e23d','a4025bc1-6871-4549-8f48-7cb0988a49ea','9480c006-86e0-4f55-8ed4-2a1b93145935','2024-02-04 12:18:18.636105'),
     ('f5cd1609-86f6-4b54-a596-4f7aa7c31fa5','9b86ac80-e2cb-45c3-900a-bc9d6692f9e1','e949f4d8-8eb2-4602-ad60-0180eb595d5a','2024-02-05 15:51:57.644636'),
     ('61014d23-2a84-4842-a9f6-282c588be25a','1f2fedb8-f19e-4865-8216-85f799d8beef','e949f4d8-8eb2-4602-ad60-0180eb595d5a','2024-02-05 15:51:57.644636'),
     ('836e92cf-2178-4dc9-baef-2e92b90253f6','1910c4d7-0011-4b2c-ab65-8f3f3895a499','e949f4d8-8eb2-4602-ad60-0180eb595d5a','2024-02-05 15:51:57.644636'),
     ('10f5e9be-b15d-4ee8-9216-8f149c6b322e','ac92b131-1eee-43b9-9c53-709aaad81ae5','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774'),
     ('e2e5be83-db93-4c92-925f-579485478d0a','a3a3166e-1e81-4527-b545-c90ca0c6366a','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774'),
     ('dedc02cf-a404-44b0-a589-875504d56607','8c7e578b-4918-4e36-91d0-d77edd73a470','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774'),
     ('ec7f1f2e-3dea-45be-a918-8201fb9cdb14','6a65e3fb-9899-4ffd-9b14-40162d95b0b8','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c40d0727-e3da-41e3-bbec-f1b3a267b8cf','b37ebaec-9e2f-498c-8b2b-e3a9f70718a9','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774'),
     ('cf96ec7a-0a61-4a0b-951e-db7877462198','40fb1281-c7d9-4066-9308-e911783ce188','8ce1d084-5663-4ca7-9005-411812e8242e','2024-02-08 11:16:52.657774'),
     ('0da97b46-f4d4-4136-a584-dc15b25dc3a5','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','49c988de-d5d1-4b5e-990f-634e3c982824','2024-02-03 16:27:38.630982'),
     ('3b724e07-005c-48a2-9bce-781c5f4a3814','f2c128c7-3e4b-404d-b824-fddfc44d4c72','49c988de-d5d1-4b5e-990f-634e3c982824','2024-02-03 16:27:38.630982'),
     ('6b35ae7e-2981-47bc-896e-7746c46e0e53','7c749acd-4feb-4a93-8339-13d9d3c42196','49c988de-d5d1-4b5e-990f-634e3c982824','2024-02-03 16:27:38.630982'),
     ('28a6345a-5476-4442-a1f4-518f7f92d82d','ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','49c988de-d5d1-4b5e-990f-634e3c982824','2024-02-03 16:27:38.630982'),
     ('03e9e7af-921b-409c-99d9-a9410de04ec0','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','49c988de-d5d1-4b5e-990f-634e3c982824','2024-02-03 16:27:38.630982'),
     ('455bbb49-9e6d-4c43-8ce8-609f45bbc0b1','6707f6b3-c64d-4a1a-baeb-baa1a0cd5fe1','ff50d478-955e-4dfd-a10e-d1d978cebfb1','2024-02-05 13:32:59.092842'),
     ('9efd3617-fe55-4d7d-89b5-e3e5befb99c0','33631b9f-0169-4cae-8403-93aa80127cbc','ff50d478-955e-4dfd-a10e-d1d978cebfb1','2024-02-05 13:32:59.092842'),
     ('51b5e95e-dfb2-48a9-b7b2-4b5ec611ee51','fb4a06e5-2a31-439a-8935-367670c1e060','ff50d478-955e-4dfd-a10e-d1d978cebfb1','2024-02-05 13:32:59.092842');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('9fe7084f-0c68-4c7b-9013-6f0660bb682d','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','ff50d478-955e-4dfd-a10e-d1d978cebfb1','2024-02-05 13:32:59.092842'),
     ('70568b25-2ed3-4b28-81d7-f23e086cbb6d','560191fc-18f7-4962-ae5e-f3f1df01bd02','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('5fe26c0e-b82c-45f6-b0d3-e983577a1676','e9110b99-b085-4070-b27d-901aeb8ddafb','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('89732126-6e0f-4239-aa32-8276063af8ef','564e84c3-0791-432c-9dd1-f5f41da54861','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('58fba54f-809d-4687-9bb5-462dd4f4d6a5','9d40faa9-3695-43d6-a19c-4dc329edb8f4','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('a9edc8bd-aa1c-41b8-b0ac-4839148f42dc','f39ebe32-2918-4fb2-ac3f-3352f7601f4a','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('c882de03-0dd0-4c75-9068-a0efa1819983','b12f9b56-0e18-4e37-b92b-79af1ec384bb','82b47b79-de3e-4423-a2fe-3ab261062f7c','2024-02-08 12:45:38.902947'),
     ('5e5b8d67-ea65-4a84-94d7-42bee4fdeafb','a4fd4b25-55e9-49ee-b25a-e5a00a03d546','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883'),
     ('610c811c-04cf-43f5-9d93-ae535c4f8d98','fb1771b0-a925-4a76-bc59-5038b7a1fa31','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883'),
     ('65fde605-2bec-452c-bc59-2044286aedb2','bbfdda21-be2b-4fb4-b02c-b9de5902dd39','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('42ee8352-ea9f-4c32-87ef-a0402b520317','ce1f6aba-e753-4693-905a-9c2efd7580bd','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883'),
     ('37b6a7ab-2979-4ac5-b4fd-9d150ceaba98','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883'),
     ('36dde308-3eb6-46e7-812a-fe1ce8ffa2fc','9d40faa9-3695-43d6-a19c-4dc329edb8f4','58688efd-d0ff-497e-b615-3de2886540fd','2024-02-08 15:18:51.951883'),
     ('9caceb5d-75cc-452f-be96-e41ad1c6061c','16e9371d-0c20-47cd-b28a-0f9f34971dde','52351f05-50ee-488c-8515-31549f08724d','2024-02-08 13:36:07.706476'),
     ('b0e2761b-8d45-4946-b7fa-20f18ccf6a56','564e84c3-0791-432c-9dd1-f5f41da54861','52351f05-50ee-488c-8515-31549f08724d','2024-02-08 13:36:07.706476'),
     ('ec34099b-dd80-4449-8d11-de27cf0a3d95','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','52351f05-50ee-488c-8515-31549f08724d','2024-02-08 13:36:07.706476'),
     ('708c4608-3ad8-40c7-a274-9f81098938a2','79dbd01d-717c-483a-9797-bfa1aee8707f','52351f05-50ee-488c-8515-31549f08724d','2024-02-08 13:36:07.706476'),
     ('387c80f8-c3ea-40b3-b835-356acbe58e43','4c70dbd1-12d1-46e2-8112-b6d9848844de','52351f05-50ee-488c-8515-31549f08724d','2024-02-08 13:36:07.706476'),
     ('b935c90a-0699-45a4-8224-94dc36c23d10','ab998306-eab1-45ce-99fb-475fe005bfb3','37513fa6-dc6f-4c2d-9238-f184a00df18e','2024-02-03 15:21:51.757289'),
     ('ae3e984a-1afe-435f-a634-1933716f6e61','2b8b6da1-7f3a-48f8-ae0e-e2f77b4d2179','37513fa6-dc6f-4c2d-9238-f184a00df18e','2024-02-03 15:21:51.757289');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('2d0eb062-eda5-4909-89fc-187bd4cb7c33','54ef1506-540c-4567-afb9-406ae9d95e34','37513fa6-dc6f-4c2d-9238-f184a00df18e','2024-02-03 15:21:51.757289'),
     ('da8a4e93-5b60-49c5-b4f4-03207aa7bd18','57cecd71-4967-4aa1-81b0-2d5b89f08692','37513fa6-dc6f-4c2d-9238-f184a00df18e','2024-02-03 15:21:51.757289'),
     ('9b9e01c2-fc26-4ef1-816a-639760c8560e','1f2fedb8-f19e-4865-8216-85f799d8beef','37513fa6-dc6f-4c2d-9238-f184a00df18e','2024-02-03 15:21:51.757289'),
     ('e2aec526-e461-41f8-97e9-be2db8645885','52e416ed-2057-4bdf-b581-69fc64419d5d','83bb59f0-c9bf-48f5-90bd-5535aea8af46','2024-02-05 13:31:18.387805'),
     ('dc72f052-cd49-401a-9077-36a3e8c11e93','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','83bb59f0-c9bf-48f5-90bd-5535aea8af46','2024-02-05 13:31:18.387805'),
     ('805b0242-88cc-4cb2-a659-4bb673d48248','61758c1a-b0d7-4c57-ae57-2c05f1a8ad10','83bb59f0-c9bf-48f5-90bd-5535aea8af46','2024-02-05 13:31:18.387805'),
     ('29315049-9e00-41b4-811e-fc6d03790196','06332dcf-95ae-4268-be24-c4496f1913f0','83bb59f0-c9bf-48f5-90bd-5535aea8af46','2024-02-05 13:31:18.387805'),
     ('90895924-05ce-448c-8790-65f378fc2576','48ec44ba-9413-46cd-92d1-866f58092166','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911'),
     ('8c1ed49d-240e-4ca6-9be8-3228d5428b00','fd5ec0d5-6819-4fb3-a67d-5c66908928f2','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911'),
     ('760a6236-ce68-47ee-a010-86df95c3127a','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('ca94c0b3-e903-4919-9471-cb6366af0daa','ce1f6aba-e753-4693-905a-9c2efd7580bd','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911'),
     ('ba975f3a-9daf-4699-a9a5-d261dcee85d4','3d633591-6215-4adc-a453-40e68ec916a4','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911'),
     ('8ab63161-7f66-43b9-aab4-5e1f2adc869a','ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','f248553c-8db2-4fc9-b0f4-91dc878fb2ab','2024-02-05 13:10:19.166911'),
     ('5f41ce87-1cb3-49b0-a51c-b9a779d91f7d','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','4c395bdf-17d0-44c3-807d-ec8d84530326','2024-02-06 15:01:34.454199'),
     ('2e363b91-d081-44d1-ab1d-c1e8d5991f31','dedf0663-486e-489b-abba-22c8106ff1a6','4c395bdf-17d0-44c3-807d-ec8d84530326','2024-02-06 15:01:34.454199'),
     ('a21eb70a-bafb-4382-8eef-89cbf67d47f0','c8c4650c-71c8-46ef-b813-f09e063dbc99','4c395bdf-17d0-44c3-807d-ec8d84530326','2024-02-06 15:01:34.454199'),
     ('8ce38af7-3652-4249-b1a8-0b55a45ab00f','a898a4c7-9704-4ada-bbca-040b5e7ec1cc','4c395bdf-17d0-44c3-807d-ec8d84530326','2024-02-06 15:01:34.454199'),
     ('fea375c9-b7fc-441c-b9ba-78ef41bcee01','9d0c479f-8051-42b5-9fda-4050621fc41b','440a0f8c-1c4b-4fc8-b1e5-1277e8ae8ca1','2024-02-02 14:26:39.652951'),
     ('cd9e0c97-c077-4416-8b6c-56bf4ea9b775','b01b4cc0-687a-415b-9fb6-d75466f5ccd3','440a0f8c-1c4b-4fc8-b1e5-1277e8ae8ca1','2024-02-02 14:26:39.652951'),
     ('a8ad8f82-a5a0-4951-b551-2a7c2ab47c90','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','440a0f8c-1c4b-4fc8-b1e5-1277e8ae8ca1','2024-02-02 14:26:39.652951');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('28f19e4e-1833-4fdd-a7b6-bc681228222e','9da16b40-3a80-43ed-9ba5-dae08b4dc83f','440a0f8c-1c4b-4fc8-b1e5-1277e8ae8ca1','2024-02-02 14:26:39.652951'),
     ('098a9760-3478-46a7-9729-4b56fb2ead33','eed01dfb-2bd1-42fe-8b9f-96666b0e5889','aeffa91f-8e69-4caa-8adb-715afc8c4b46','2024-02-01 11:34:30.940831'),
     ('831ffb0b-9355-44c4-9af7-4c50704759aa','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','aeffa91f-8e69-4caa-8adb-715afc8c4b46','2024-02-01 11:34:30.940831'),
     ('fe6f5e28-4fb1-4b1d-aa4c-40894b3636bb','0acc5e48-5c5b-4a90-8758-3476bdc751fb','aeffa91f-8e69-4caa-8adb-715afc8c4b46','2024-02-01 11:34:30.940831'),
     ('6bde1f25-4c33-4827-ae0b-3c0578afa32f','9d40faa9-3695-43d6-a19c-4dc329edb8f4','aeffa91f-8e69-4caa-8adb-715afc8c4b46','2024-02-01 11:34:30.940831'),
     ('d571b000-30ab-4ca9-9866-cb9ef4f1ba31','7dfc26f3-df2f-42fc-be4d-26ff0e74cf4c','2cf440a6-4551-4f01-860c-4461f3476429','2024-02-02 15:37:38.620339'),
     ('80c8c826-2ad7-40e4-8163-6b8e4dacc27f','69f29151-e648-4689-88e6-1ceaed25a7af','2cf440a6-4551-4f01-860c-4461f3476429','2024-02-02 15:37:38.620339'),
     ('81709040-32bb-4cfb-ac3d-ca11bfc9809a','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','2cf440a6-4551-4f01-860c-4461f3476429','2024-02-02 15:37:38.620339'),
     ('49745119-7354-4a23-a6e1-154727bc5a4e','fa027eba-8479-4063-a726-a70bbaae49bf','2cf440a6-4551-4f01-860c-4461f3476429','2024-02-02 15:37:38.620339'),
     ('dd1eaa2b-e6f9-4c51-91e4-b46663d8fa89','fbea9b30-2290-4cbb-8392-be84158648a0','2cf440a6-4551-4f01-860c-4461f3476429','2024-02-02 15:37:38.620339');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('b70844a0-2f38-48c1-afb9-a321840ee5ce','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','3d2d1cc0-d614-491c-b972-51393682fbc7','2024-02-08 13:14:48.553438'),
     ('d0f2bc90-4814-4a67-ab27-49c9aed7087b','5da4cb5d-bea9-4409-b3ce-004a48ccf763','3d2d1cc0-d614-491c-b972-51393682fbc7','2024-02-08 13:14:48.553438'),
     ('f6658b32-dc49-4045-aa9b-7436fce60274','fae9d942-de16-48d5-8e27-3c271e6071f6','3d2d1cc0-d614-491c-b972-51393682fbc7','2024-02-08 13:14:48.553438'),
     ('18571c3e-09ee-4076-a701-f24de686f027','4fa7b45c-d365-4d3a-86ad-9f18573a5512','3d2d1cc0-d614-491c-b972-51393682fbc7','2024-02-08 13:14:48.553438'),
     ('35d65ada-f29d-4ea8-9b5f-b57164a824ce','4fa7b45c-d365-4d3a-86ad-9f18573a5512','706bf9f2-602b-4321-bcde-13b0a5483397','2024-02-08 12:31:44.695469'),
     ('4e9dcd85-a3fd-4e6c-8740-566f12b9f0ff','b469ad32-ed71-4201-9b6c-4f300b2a480d','706bf9f2-602b-4321-bcde-13b0a5483397','2024-02-08 12:31:44.695469'),
     ('d249570c-441d-4107-a340-a8c853ba487d','944c1df7-83fc-4e02-acfa-a051247ccb7b','706bf9f2-602b-4321-bcde-13b0a5483397','2024-02-08 12:31:44.695469'),
     ('e875a942-beed-47d8-9db0-39962437373f','6e0a9e64-cfec-4afa-aa19-839412112cdf','706bf9f2-602b-4321-bcde-13b0a5483397','2024-02-08 12:31:44.695469'),
     ('6c1eed38-6ff7-44d3-b538-fd9fb374d308','9231e3ad-6b2e-4fce-810e-963b45adeb84','556b381a-db3e-4592-b436-d94646b028d1','2024-02-05 14:52:48.771108'),
     ('05272de3-03e6-4190-bda0-c11eb9abf7ae','e5d0db67-242a-4b88-b335-ccc0d0af8879','556b381a-db3e-4592-b436-d94646b028d1','2024-02-05 14:52:48.771108');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('e2715f0a-f11a-402d-9170-704a791b5295','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','556b381a-db3e-4592-b436-d94646b028d1','2024-02-05 14:52:48.771108'),
     ('6da97135-97d2-4f1e-a03f-b78857d70344','b8322e1b-079a-44de-ad59-4978b2fd4dcc','ffb1b27b-8902-4f9f-827b-ca82ce57232a','2024-02-05 14:00:18.548405'),
     ('623c0048-a6c3-40f3-a059-5f0d9ff91a97','b9ba13f8-222f-4786-8c27-c237b134cc55','ffb1b27b-8902-4f9f-827b-ca82ce57232a','2024-02-05 14:00:18.548405'),
     ('dc368d5d-ec54-4931-a2b5-8cf159c0c80e','57220801-cfd2-409d-9efc-16f5c55ec521','ffb1b27b-8902-4f9f-827b-ca82ce57232a','2024-02-05 14:00:18.548405'),
     ('eb1059b3-169e-47c4-b1b5-40d51c5dc06f','1f2fedb8-f19e-4865-8216-85f799d8beef','ffb1b27b-8902-4f9f-827b-ca82ce57232a','2024-02-05 14:00:18.548405'),
     ('8c88dd6a-d83e-45af-87b5-2f84cb7b4a6a','ce1f6aba-e753-4693-905a-9c2efd7580bd','ffb1b27b-8902-4f9f-827b-ca82ce57232a','2024-02-05 14:00:18.548405'),
     ('4eecef2f-3836-415d-8a5a-5ee0f4030f3b','eed01dfb-2bd1-42fe-8b9f-96666b0e5889','7fa6d33c-3a46-4851-9514-dd920c996d88','2024-02-06 14:22:46.808902'),
     ('4ea9a88f-a8c7-4cce-8896-cb69ce6b3d13','ce1f6aba-e753-4693-905a-9c2efd7580bd','7fa6d33c-3a46-4851-9514-dd920c996d88','2024-02-06 14:22:46.808902'),
     ('91b7ec37-c4cf-491c-a37c-501a088c01a1','7a8a6302-d49a-4dec-b1be-858c8cc1c2aa','7fa6d33c-3a46-4851-9514-dd920c996d88','2024-02-06 14:22:46.808902'),
     ('adff502d-3b1c-4c95-9c83-bb6f1513f285','54ef1506-540c-4567-afb9-406ae9d95e34','22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','2024-02-06 13:08:36.180385');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('5c2fe639-7d0f-493e-bc27-01c67cdddfbd','18883ccb-71e0-4af7-ae0f-4be8a69472c1','22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','2024-02-06 13:08:36.180385'),
     ('1f949a73-8c5c-4c9a-b13a-40f01f1d3f4a','4fa7b45c-d365-4d3a-86ad-9f18573a5512','22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','2024-02-06 13:08:36.180385'),
     ('4138ad19-7517-4864-8417-2e0f7af9bdee','f00ecf87-1b80-41cf-b680-b7f3b32b626c','22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','2024-02-06 13:08:36.180385'),
     ('72420aae-fac2-408a-b516-5eaadd58b588','0dd229b4-bf6b-450f-bade-2295cfb8c2f6','22478cd5-67ab-47d2-a9c8-d0b9c439a5ae','2024-02-06 13:08:36.180385'),
     ('68a0ba7f-8339-47fa-af59-7fe1a68e369a','fbea9b30-2290-4cbb-8392-be84158648a0','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852'),
     ('2579ccf8-852c-4205-af71-2b2054d80e25','9231e3ad-6b2e-4fce-810e-963b45adeb84','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852'),
     ('63a300d3-6250-49de-8958-a146550fb8be','cf5bc3d9-b9f2-45cc-9ae5-67154dc93cdc','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852'),
     ('9fefbeea-0ba8-45bc-8f35-0c851d5990b1','8aad9ff1-bfe4-4852-bb56-cda6359ed5bf','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852'),
     ('5437c1ce-17d2-4a3b-aada-fd12f7e1f98c','73b5e884-070d-4c2a-b272-08c8fd05e44f','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852'),
     ('9a5f2b9a-a2c4-4c75-99eb-f7b3ab6959dd','40fb1281-c7d9-4066-9308-e911783ce188','9743d7eb-818d-46d6-a1fc-7ab428358e18','2024-02-01 12:49:57.072852');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('2dc7c531-1ff8-4290-8a8d-fc5696219d98','ac38f34b-99d1-4a4d-acb8-738b299fb79c','1844d3d6-972f-408d-9de4-4451367edb65','2024-02-02 12:47:47.060901'),
     ('a7e1eb1f-7ba6-45f0-a41b-d80d473e6134','16e9371d-0c20-47cd-b28a-0f9f34971dde','1844d3d6-972f-408d-9de4-4451367edb65','2024-02-02 12:47:47.060901'),
     ('91e9386a-448a-4a00-887e-125635dc115e','5e17d1ff-5cd1-4736-a123-635b36225eea','1844d3d6-972f-408d-9de4-4451367edb65','2024-02-02 12:47:47.060901'),
     ('eb2dd25d-8b62-49f7-a4ce-a37e2f1d92e8','840d0b10-cce9-43d4-b57e-d381193335eb','21c48532-23fd-4a53-b860-91bcbcf9acbd','2024-02-02 11:48:03.528875'),
     ('44ee3200-19e0-44f0-ba91-c6d4b27fc49d','ab998306-eab1-45ce-99fb-475fe005bfb3','21c48532-23fd-4a53-b860-91bcbcf9acbd','2024-02-02 11:48:03.528875'),
     ('e30bb729-152e-4371-a0b5-5c547e4302fd','7c749acd-4feb-4a93-8339-13d9d3c42196','21c48532-23fd-4a53-b860-91bcbcf9acbd','2024-02-02 11:48:03.528875'),
     ('2acee6bd-7b4f-4853-a7d1-359dd7ed751d','a05eef2f-5eec-4520-b647-98a890495b67','21c48532-23fd-4a53-b860-91bcbcf9acbd','2024-02-02 11:48:03.528875'),
     ('9932fe75-b2f1-4a82-a3cd-c41d35ef8a93','a162d19b-bd43-4e3a-b989-fbc37b0d2b83','21c48532-23fd-4a53-b860-91bcbcf9acbd','2024-02-02 11:48:03.528875'),
     ('e70f3f17-40b0-4322-9575-48f61c287179','716d7d62-b4ec-4749-a7a6-8a05fa229cf3','fda80abd-cf84-4f30-b5e1-bd4f0074d765','2024-02-03 14:48:50.156901'),
     ('bf53904b-ef1b-404c-9baa-8d20a1160792','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','fda80abd-cf84-4f30-b5e1-bd4f0074d765','2024-02-03 14:48:50.156901');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('4fe30e35-d259-4b82-a59f-3bfdce3c0c72','a5a38c7c-9b7d-45d5-b84f-b2365f7d14c4','fda80abd-cf84-4f30-b5e1-bd4f0074d765','2024-02-03 14:48:50.156901'),
     ('52fbd641-4443-4e10-afb4-c6ada471f26c','1910c4d7-0011-4b2c-ab65-8f3f3895a499','fda80abd-cf84-4f30-b5e1-bd4f0074d765','2024-02-03 14:48:50.156901'),
     ('fd196f4f-73c3-4d35-83ff-d8acc22bcb08','ab998306-eab1-45ce-99fb-475fe005bfb3','fda80abd-cf84-4f30-b5e1-bd4f0074d765','2024-02-03 14:48:50.156901'),
     ('763d4273-9a2c-4845-8837-881c55ecebd3','8539137f-49e3-43a9-8340-806146c7f27a','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('9c7c5b08-cc26-4c72-8880-f7cacd0e72d5','4c70dbd1-12d1-46e2-8112-b6d9848844de','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('7da27790-1c6a-4d79-a2ba-e2dfc4624d06','54ef1506-540c-4567-afb9-406ae9d95e34','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('8251fb68-50bd-4e6a-8791-e0c823bfb0ab','9bc0b6ec-612f-4695-8dc4-7d3c32dc6a0f','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('27f9c3b2-c22e-4a70-8101-eecaf9844972','a05eef2f-5eec-4520-b647-98a890495b67','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('fe1b2a14-58dd-4914-a77a-3e22ba18fd60','bbfdda21-be2b-4fb4-b02c-b9de5902dd39','b5b5e2df-8dd2-491a-9924-8117aba37dbe','2024-02-02 14:52:03.388335'),
     ('323afd2b-8238-4540-8998-d0fd82aa5df2','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('1e65fbb6-6a58-4591-aaa5-c54107a67cf3','783a5a8a-d439-487d-a190-6a2fc5903553','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766'),
     ('4415a907-39e6-4cc7-af83-678d20cbd952','9d0c479f-8051-42b5-9fda-4050621fc41b','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766'),
     ('0d717649-596f-4a2a-8065-e18f4a49dcf7','13dafda4-726b-4318-b683-816ba41cc201','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766'),
     ('7b94a867-2e1c-4f3c-8a1b-a93e86a100ed','a162d19b-bd43-4e3a-b989-fbc37b0d2b83','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766'),
     ('e63c6263-3ba1-4dfc-8598-c13f51c8006a','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','16b85a6d-13c2-4e75-827c-9f8f04ca3c45','2024-02-04 17:48:56.40766'),
     ('65815a41-d27f-460a-99ab-53ce62fd792b','62b2f8bd-de13-47d5-ae67-405e5305ead2','cd4cbdf5-d94b-4389-bdfa-570a7f3662cc','2024-02-01 09:18:52.636889'),
     ('744c03d3-bcf8-4968-b6c2-f129350506e9','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','cd4cbdf5-d94b-4389-bdfa-570a7f3662cc','2024-02-01 09:18:52.636889'),
     ('99458649-1a54-428d-9eb6-c44e7a8fe8a3','7c980fde-0868-4ac0-92e3-330db7529b74','cd4cbdf5-d94b-4389-bdfa-570a7f3662cc','2024-02-01 09:18:52.636889'),
     ('28fdca65-9663-4d00-877d-ff2b0795abef','b699576a-07af-4fd6-bcc5-6c912630c3a6','cd4cbdf5-d94b-4389-bdfa-570a7f3662cc','2024-02-01 09:18:52.636889'),
     ('43583594-55e5-48c8-905b-91ba1b83ff5e','4c70dbd1-12d1-46e2-8112-b6d9848844de','7403c507-9296-4fe2-91dd-f158ef43e22c','2024-02-07 12:52:39.688629');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('26924577-89ad-4e7b-8a88-27dbeb1de40b','d53d6ec8-b106-448e-ad64-8664daa53a51','7403c507-9296-4fe2-91dd-f158ef43e22c','2024-02-07 12:52:39.688629'),
     ('92926eaa-8775-46dd-96d1-6032df97e320','18f5f8ba-4d0c-441f-aabe-9a02503d24bf','7403c507-9296-4fe2-91dd-f158ef43e22c','2024-02-07 12:52:39.688629'),
     ('c7238d5c-2aea-4558-bc12-d819c333d746','8c7e578b-4918-4e36-91d0-d77edd73a470','a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','2024-02-03 14:54:16.703969'),
     ('93d5cadb-278c-4eeb-9cf6-4221391884b3','3d016b73-5721-46a0-aded-c522e70c61b8','a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','2024-02-03 14:54:16.703969'),
     ('66e477c3-ac3d-4017-9665-3b462b52c4ea','40fb1281-c7d9-4066-9308-e911783ce188','a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','2024-02-03 14:54:16.703969'),
     ('813e4f80-cab9-4d70-a809-742cad554a2a','72ed26d2-3c4b-4e12-913a-fa9e66f04f5f','a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','2024-02-03 14:54:16.703969'),
     ('07b0d5b9-e2cd-406b-9194-670dad3e3b3a','0c718674-7871-4988-8746-3b40027ac3b1','a86b09db-f9f2-498b-8e15-0f2bbfbd2ded','2024-02-03 14:54:16.703969'),
     ('943d9e8c-e085-47d9-87ca-bdc0df520500','1f153562-754c-42cb-950d-9331304561b3','91b39f90-6936-4f30-a482-5fc317708fc1','2024-02-06 15:44:00.814241'),
     ('26fcfc2e-6a07-490b-a4b6-5a18dc28f23f','386e6f19-ff6e-48be-954e-f9dfa51b5b80','91b39f90-6936-4f30-a482-5fc317708fc1','2024-02-06 15:44:00.814241'),
     ('03615850-3407-403d-99ea-539eae8637e4','0f9ce201-dbb0-4dd2-9854-2707e6b40201','91b39f90-6936-4f30-a482-5fc317708fc1','2024-02-06 15:44:00.814241');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('02728846-cf6a-4541-aeee-3af9b5246c4f','16e9371d-0c20-47cd-b28a-0f9f34971dde','91b39f90-6936-4f30-a482-5fc317708fc1','2024-02-06 15:44:00.814241'),
     ('cfd85335-6567-4708-95e1-75d354f872c0','ff5da20e-719f-4546-9050-b51ce5893289','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('e576d664-d7b9-4a15-8b1e-affd8c2582c6','5da4cb5d-bea9-4409-b3ce-004a48ccf763','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('036a3ca6-00d0-4e0d-967e-a55872f1d798','a7d95827-e81a-45f3-b863-d5242c170545','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('4e15869e-e06e-43b9-a790-692ad4bbb214','e9fcbc8e-a739-4969-8e27-6a5b3e5548e9','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('3c56021a-2e12-4b56-b0b4-1331ed97b907','ccbb1012-6f3e-4bbd-ac7f-4cb943e5ac53','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('946cd092-3463-4f29-9770-e0bc740eb558','bd7f32f4-590c-4d1d-ac70-8bb04f481329','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('3ca396b1-2623-4812-b1ec-7d29ee370259','47df138d-c714-4344-844f-858d9307f5f3','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('e4d79b0b-7b92-406e-bc86-93692ce8a1bc','af14befa-6203-459d-ae31-cbd71e8cca0e','a89d954f-0245-4db1-ac65-60d9bc18fc0b','2024-02-07 12:22:03.329514'),
     ('925cbdb2-dfd1-4800-a745-fef55891c0b7','16e56781-09b6-4271-9fac-ade178214849','ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','2024-02-03 12:01:27.171315');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('c0722524-b187-4f39-86ba-5ffec67c86b2','0f9ccfc0-8809-4918-b688-3326d7510e2c','ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','2024-02-03 12:01:27.171315'),
     ('81bc0207-aeec-4659-a587-570f18f0a83b','72a4f385-4733-447c-9900-7cf624110fde','ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','2024-02-03 12:01:27.171315'),
     ('154a8d68-ce7b-4dd3-a69d-06052917d4a6','a7d95827-e81a-45f3-b863-d5242c170545','ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','2024-02-03 12:01:27.171315'),
     ('8d456ac9-9da6-4513-b265-da8d3cf6878f','7d7f447f-d0ef-4ab7-8d45-9990796c9094','ccb5b5cd-6107-4690-b8e6-a7c38fc066ae','2024-02-03 12:01:27.171315'),
     ('1edc3e15-15fd-4c86-ac0b-64f1f0b4c76a','ff5da20e-719f-4546-9050-b51ce5893289','a5470cb2-3293-48ca-9513-b095ff05b0aa','2024-02-06 11:08:48.167131'),
     ('0fcdc463-0db8-4b09-b00d-118d730854f0','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','a5470cb2-3293-48ca-9513-b095ff05b0aa','2024-02-06 11:08:48.167131'),
     ('7b6111b8-cf93-4bce-9db3-b6748dee773f','76fed48b-5c6b-4e36-b58c-300918f2fc7f','a5470cb2-3293-48ca-9513-b095ff05b0aa','2024-02-06 11:08:48.167131'),
     ('0d7c74b6-f581-4724-8192-0fc2c234e6ba','e5d0db67-242a-4b88-b335-ccc0d0af8879','a5470cb2-3293-48ca-9513-b095ff05b0aa','2024-02-06 11:08:48.167131'),
     ('42d2a2a4-7e05-4274-bf21-b6458cce5dee','d53d6ec8-b106-448e-ad64-8664daa53a51','a5470cb2-3293-48ca-9513-b095ff05b0aa','2024-02-06 11:08:48.167131'),
     ('4658b9f9-899a-4263-b880-70ed84853563','16e9371d-0c20-47cd-b28a-0f9f34971dde','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('82f1f67b-0dd9-4a27-8685-89f5bfc0a61d','76fed48b-5c6b-4e36-b58c-300918f2fc7f','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('8018ec0b-b843-48a6-9540-ef873c8a65c5','bec4c6f8-8b05-479d-b0c8-916556329916','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('84a83609-2b31-48fb-a18f-e231ce326600','5da4cb5d-bea9-4409-b3ce-004a48ccf763','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('846ac545-6345-4d10-8eec-921fc0c14e7b','9cf842e3-3f69-48b5-bdd5-7d9fc3dfc240','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('60be2fa2-df78-48c6-8ea9-8e2911ce625b','241ed246-259d-4da6-bdb0-8746da664587','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('5b5678f0-261f-411a-8170-c69b1f1e6b4d','ff5da20e-719f-4546-9050-b51ce5893289','19bdaf5b-be11-46af-b0b0-494dc04993be','2024-02-05 15:20:17.044462'),
     ('87b76cc0-cf53-4f55-b504-f01e3f43a1af','944c1df7-83fc-4e02-acfa-a051247ccb7b','3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','2024-02-02 15:37:20.556152'),
     ('81a53575-58a1-4555-978c-dcc8528e2151','7c581969-99db-40f8-b4d1-f8b0a244cc2f','3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','2024-02-02 15:37:20.556152'),
     ('cdf71cd6-7280-44f2-b8b7-ad872c63a208','b01b4cc0-687a-415b-9fb6-d75466f5ccd3','3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','2024-02-02 15:37:20.556152'),
     ('c4afea17-91fe-486e-b434-121d0e70323a','edf26d44-e2df-4bae-aae9-cfbf5bd37a35','3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','2024-02-02 15:37:20.556152');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('da21007b-43f0-408d-9c7a-9ae8a2f731d8','37bc394a-7d32-49ea-b123-16e9de728b62','3d76ecb4-7ac2-4d66-afcd-d7cf900d4801','2024-02-02 15:37:20.556152'),
     ('d5617878-d708-4225-8262-f425c3bb3392','7dfc26f3-df2f-42fc-be4d-26ff0e74cf4c','1c800390-acf2-4d07-a2bb-12af13d5db68','2024-02-07 14:52:16.356366'),
     ('f9d5940a-0524-44dd-afe4-9156a6cb44fe','72a4f385-4733-447c-9900-7cf624110fde','1c800390-acf2-4d07-a2bb-12af13d5db68','2024-02-07 14:52:16.356366'),
     ('c2ee4d61-1e82-49ee-bb64-11afa996db65','b9ba13f8-222f-4786-8c27-c237b134cc55','1c800390-acf2-4d07-a2bb-12af13d5db68','2024-02-07 14:52:16.356366'),
     ('59aa8fef-5501-42f8-9a8a-a834ad005cd7','cb940b63-8fab-4ff3-9a2d-9f0ca5646c05','1c800390-acf2-4d07-a2bb-12af13d5db68','2024-02-07 14:52:16.356366'),
     ('09e05f01-ecb9-41af-a369-91e875aa8df5','bc51b96f-6f70-48b2-8b9c-307cbf3caa16','08b3806a-6982-4e83-8b50-ab66a21e30aa','2024-02-05 12:37:21.428519'),
     ('37bdf658-6344-4a06-9a51-98b784ebf8ca','bf4fa5eb-4819-4034-b5b8-d172cb1c7b8c','08b3806a-6982-4e83-8b50-ab66a21e30aa','2024-02-05 12:37:21.428519'),
     ('79d24682-ded5-41ef-9c5e-39c40389b937','783a5a8a-d439-487d-a190-6a2fc5903553','08b3806a-6982-4e83-8b50-ab66a21e30aa','2024-02-05 12:37:21.428519'),
     ('75cf4383-3262-4b33-ad77-cd3e0e43d931','7c581969-99db-40f8-b4d1-f8b0a244cc2f','08b3806a-6982-4e83-8b50-ab66a21e30aa','2024-02-05 12:37:21.428519'),
     ('324d45bc-9cba-426b-a49d-226212719f29','1f2fedb8-f19e-4865-8216-85f799d8beef','08b3806a-6982-4e83-8b50-ab66a21e30aa','2024-02-05 12:37:21.428519');
  INSERT INTO public.enrollment (id,group_id,student_id,enrollment_hour) VALUES
     ('79018b96-1093-4564-ae7c-5b5625b7a2e6','72a4f385-4733-447c-9900-7cf624110fde','44a54fc4-1b5d-4940-a93b-6d72b0843477','2024-02-06 12:53:43.494552'),
     ('b98cb2d5-e009-4e64-94d7-378083acd186','fae9d942-de16-48d5-8e27-3c271e6071f6','44a54fc4-1b5d-4940-a93b-6d72b0843477','2024-02-06 12:53:43.494552'),
     ('b464384d-c3d8-4896-a6f8-5e63282089d5','43530bb8-eb01-4158-8a8b-9ee1d2548dbc','44a54fc4-1b5d-4940-a93b-6d72b0843477','2024-02-06 12:53:43.494552'),
     ('a13a50ce-a9d2-441e-ae73-d1c5d00b4109','1ff5e38d-925e-4b2a-8abc-7ea3cb104d89','44a54fc4-1b5d-4940-a93b-6d72b0843477','2024-02-06 12:53:43.494552');
  
  
  
  `,
};

export default CONFIG;
