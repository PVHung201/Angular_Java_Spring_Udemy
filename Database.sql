USE `full-stack-ecommerce`;

-- clean up previous datebase tables 

set foreign_key_checks =0;

truncate customer;
truncate orders;
truncate order_item;
truncate address;

set foreign_key_checks =1;

-- Step 2: make the emaill address unique

alter table customer add unique (email);