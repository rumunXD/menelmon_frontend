import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import TableRow from "../assets/historyTable/TableRows/TableRow.tsx";
import '@testing-library/jest-dom'

test('tests for tablerow', async () =>{
    render(<TableRow id={3} playedAt={"2025:03:23"} result={true} hp1={10} hp2={0}/>)

    except(screen.getByRole('td')).toHaveTextContent('Wygrana')
})