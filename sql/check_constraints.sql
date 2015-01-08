ALTER TABLE price
ADD CONSTRAINT chkPriceMustBeGreaterThan0 CHECK (value>0 );
