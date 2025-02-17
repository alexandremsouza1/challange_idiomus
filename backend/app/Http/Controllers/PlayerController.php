<?php

// /////////////////////////////////////////////////////////////////////////////
// PLEASE DO NOT RENAME OR REMOVE ANY OF THE CODE BELOW. 
// YOU CAN ADD YOUR CODE TO THIS FILE TO EXTEND THE FEATURES TO USE THEM IN YOUR WORK.
// /////////////////////////////////////////////////////////////////////////////

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PlayerService;

class PlayerController extends Controller
{

    protected $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    public function index()
    {
        $players = $this->playerService->getAllPlayers();
        if ($players) {
            return response()->json($players);
        }
        return response("Failed", 500);
    }

    public function show($id)
    {
        $player = $this->playerService->getPlayerById($id);
        if ($player) {
            return response()->json($player);
        }
        return response("Failed", 500);
    }

    public function store(Request $request)
    {
        $player = $this->playerService->createPlayer($request->all());
        if ($player) {
            return response()->json($player, 201);
        }
        return response("Failed", 500);
    }

    public function update(Request $request, $id)
    {
        $player = $this->playerService->updatePlayer($id, $request->all());
        if ($player) {
            return response()->json($player);
        }
        return response("Failed", 500);
    }

    public function destroy($id)
    {
        $player = $this->playerService->deletePlayer($id);
        if ($player) {
            return response()->json($player);
        }
        return response("Failed", 500);
    }
}
