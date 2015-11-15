SELECT cmoa.cmoa.nationality,
		cmoa.countries.SHORT_NAME,
        cmoa.countries.LAT,
        cmoa.countries.LON, COUNT(*) as `num` FROM cmoa.cmoa
        LEFT JOIN cmoa.nationalities
			INNER JOIN cmoa.countries
            ON cmoa.nationalities.Country = cmoa.countries.SHORT_NAME
        ON cmoa.nationalities.Nationality = cmoa.cmoa.nationality
GROUP BY cmoa.countries.SHORT_NAME