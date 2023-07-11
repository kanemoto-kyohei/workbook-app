<?php

namespace Tests\Unit\Services;

use PHPUnit\Framework\TestCase;
use App\Services\WorkService;
use Mockery;

class SecondWorkbookServiceTest extends TestCase
{
    /**
     * A basic unit test example.
     * @runInSeparateProcess
     * @return void
     */
    public function test_check_own_work(): void
    {
        $workService = new WorkService();


        $workbookmock = Mockery::mock('alias:App\Models\Workbook');
        $workbookmock->shouldReceive('where->firstOrFail')->andReturn((object)[
            'workbook_id'=>'5de31232-20ba-49f5-980c-ce6356e276ab'
        ]);

        $workmock = Mockery::mock('alias:App\Models\Work');
        $workmock->shouldReceive('where->firstOrFail')->andReturn((object)[
            'workbook_id'=>'5de31232-20ba-49f5-980c-ce6356e276ab'
        ]);


        $result = $workService->getWorkbook('5de31232-20ba-49f5-980c-ce6356e276ab');
        $this->assertNotNull($result); 
        
        $result = $workService->getWork(1);
        $this->assertNotNull($result);    




    }
}

