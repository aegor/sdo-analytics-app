select S.name as school, R1.* from
    (select R.*, M.name as municipality from
        (select
            U.email as email,
            P.name as name,
            P.municipality_id,
            P.school_id
            from auth_user as U
            INNER JOIN auth_userprofile as P ON P.user_id = U.id
            where 1
        )   as R
        inner join student_municipality as M on M.id = R.municipality_id
    ) as R1
    inner join student_school as S on S.id = R1.school_id
limit 10