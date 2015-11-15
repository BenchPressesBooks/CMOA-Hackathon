SELECT t2.Country, COUNT(*) AS `num`
FROM cmoa t1
LEFT JOIN nationalities t2 ON t2.nationality = t1.nationality
WHERE t2.nationality IS NOT NULL
GROUP BY t2.Country